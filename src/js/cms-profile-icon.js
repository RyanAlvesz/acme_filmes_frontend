'use strict'

import { getProfileIcons, getProfileIconsCategories, postProfileIcon, updateProfileIcon, deleteProfileIcon } from './functions.js'
import { uploadImage } from './firebase.js'
import { closeLoading } from './loading.js'

const colorThief = new ColorThief()

const profileIconsSection = document.getElementById('profile-icons-section')
const buttonCreateProfileIcon = document.getElementById('create-profile-icon')
const postProfileIconContainer = document.getElementById('post-profile-icon-container')
const buttonClosePostProfileIconContainer = document.getElementById('close-post-profile-icon')
const editProfileIconContainer = document.getElementById('edit-profile-icon-container')
const buttonCloseEditProfileIconContainer = document.getElementById('close-edit-profile-icon')
const searchBar = document.getElementById('search')

// Post input
const nameInput = document.getElementById('name')
const categoryInput = document.getElementById('category')
const imageInput = document.getElementById('image')
const buttonRegisterProfileIcon = document.getElementById('button-register-profile-icon')

// Edit Input
const editNameInput = document.getElementById('edit-name')
const editCategoryInput = document.getElementById('edit-category')
const editImageInput = document.getElementById('edit-image')
const buttonSaveEditProfileIcon = document.getElementById('button-edit-profile-icon')
const buttonDeleteProfileIcon = document.getElementById('button-delete-profile-icon')

let profileIconsARRAY

const createIconCard = (icon) => {

    const card = document.createElement('div')
    card.classList.add('bg-dark_gray', 'w-[calc((80vw-3.5rem-(0.5rem*5))/6)]', 'h-[calc((80vw-3.5rem-(0.5rem*5))/6)]', 'overflow-hidden', 'rounded-md', 'p-3', 'flex', 'ease-linear', 'duration-200', 'hover:scale-[1.01]', 'cursor-pointer')
    
    card.addEventListener('click', () => {
        setEditProfileIcon(icon)
        localStorage.setItem('editProfileIconId', icon.id)
        localStorage.setItem('editProfileIconImageUrl', icon.foto)
        editProfileIconContainer.classList.remove('hidden')
        editProfileIconContainer.classList.add('fixed')
    })

    const iconImage = document.createElement('img')
    iconImage.classList.add('w-full', 'h-full', 'object-cover', 'rounded-md')
    iconImage.src = icon.foto
    iconImage.alt = icon.nome
    iconImage.crossOrigin = "Anonymous"

    iconImage.addEventListener('load', function() {
        let rgb = colorThief.getPalette(iconImage)[1]
        card.style.backgroundColor = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
    })

    card.replaceChildren(iconImage)

    return card

}

const setProfileIcons = (icons) => {

    profileIconsSection.replaceChildren('')
    icons.forEach((icon) => {
        const iconCard = createIconCard(icon)
        profileIconsSection.appendChild(iconCard)
    })

}

const createCategoryOption = (category) => {

    const option = document.createElement('option')
    option.textContent = category.nome
    option.value = category.id
    return option

}

const setCategories = (categories) => {

    categories.forEach((category) => {
        const option = createCategoryOption(category)
        categoryInput.appendChild(option)
    })

}

const addPostProfileIconContainer = () => {
    postProfileIconContainer.classList.add('fixed')
    postProfileIconContainer.classList.remove('hidden')
}

const closePostProfileIconContainer = () => {
    postProfileIconContainer.classList.remove('fixed')
    postProfileIconContainer.classList.add('hidden')
    clearPostProfileIconContainer()
}

const clearPostProfileIconContainer = () => {

    nameInput.value = ''
    imageInput.value = ''

}

const closeEditProfileIconContainer = () => {
    editProfileIconContainer.classList.add('hidden')
    editProfileIconContainer.classList.remove('fixed')
}

const postProfileIconFun = async() => {

    if(postInputValidation()){
        
        Swal.fire({
            position: 'center',
            title: '<p class="text-2xl text-dark_gray"> Cadastrando Foto... <p>',
            imageUrl: "../../images/logo.png",
            imageWidth: '60%',
            imageAlt: "Logo acme",
            showConfirmButton: false,
            padding: '0 0 28px 0',
            width: '30rem',
            heightAuto: false
        })

        const imageUrl = await getPostImageUrl()
    
        const icon = {
            nome: nameInput.value,
            foto: imageUrl,
            id_categoria_foto_perfil: categoryInput.value
        }
        
        const rsPost = await postProfileIcon(icon)
        const profileIcons = await getProfileIcons()
        profileIconsARRAY = profileIcons.fotos
        setProfileIcons(profileIcons.fotos)
    
        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-dark_gray"> Foto de Perfil cadastrada com sucesso! <p>',
            icon: 'success',
            iconColor: '#FF0000',
            showConfirmButton: false,
            width: '25rem',
            heightAuto: false
        })

    }


}

const postInputValidation = () => {

    let validation = false

    if (
        nameInput.value == '' ||
        imageInput.files.length == 0 ||
        categoryInput.value == ''
    ) {

        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-secundary"> Preencha todas as informações corretamente <p>',
            icon: 'warning',
            iconColor: '#FD3131',
            showConfirmButton: false,
            width: '25rem',
            heightAuto: false
        })

    } else {

        validation = true

    }

    return validation

}

const getImageUrl = async (file) => {

    const url = await uploadImage(file, 'icons')
    return url

}

const getPostImageUrl = async () => {

    const imageUrl = await getImageUrl(imageInput.files[0])
    return imageUrl

}

const setEditCategories = async (categoryID) => {

    const categoriesJSON = await getProfileIconsCategories()
    editCategoryInput.replaceChildren('')

    categoriesJSON.categorias.forEach((category) => {
        const option = createCategoryOption(category)
        if (category.id == categoryID) {
            option.setAttribute('selected', true)
        }
        editCategoryInput.appendChild(option)
    })


}

const setEditProfileIcon = (icon) => {

    editImageInput.value = ''

    editNameInput.value = icon.nome
    setEditCategories(icon.id_categoria)
    editImageInput.previousElementSibling.src = icon.foto

}

const changeEditProfileIconImagePreview = async(input) => {

    const url = await getImageUrl(input.files[0])
    input.previousElementSibling.src = url
    localStorage.setItem('editImageUrl', url)

}

const deleteProfileIconFun = () => {

    const swalWithBootstrapButtons = Swal.mixin({

        customClass: {
            confirmButton: 'bg-secundary rounded-lg px-6 h-10 w-44 text-lg text-white max-md:text-base max-md:w-32',
            cancelButton: 'bg-main rounded-lg px-6 h-10 w-44 text-lg text-white mr-6 max-md:text-base max-md:w-32'
        },
        buttonsStyling: false,
        heightAuto: false

    })

    swalWithBootstrapButtons.fire({

        title: '<p class="text-2xl text-secundary font-poppins"> Tem certeza que deseja excluir essa foto de perfil? </p>',
        html: '<p class="text-dark_gray"> Essa ação não poderá ser desfeita </p>',
        icon: 'warning',
        iconColor: '#FD3131',
        showCancelButton: true,
        confirmButtonText: 'Excluir',
        cancelButtonText: 'Cancelar',
        width: '35%',
        padding: '0 0 28px 0',
        heightAuto: false,
        reverseButtons: true

    }).then(async (result) => {

        if (result.isConfirmed) {

            const rsDelete = await deleteProfileIcon(localStorage.getItem('editProfileIconId'))
            const profileIcons = await getProfileIcons()
            profileIconsARRAY = profileIcons.fotos
            setProfileIcons(profileIcons.fotos)        
            closeEditProfileIconContainer()

        }

    }) 

}

const editInputValidation = () => {

    let validation = false

    if (
        editNameInput.value == ''
    ) {

        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-secundary"> Preencha todas as informações corretamente <p>',
            icon: 'warning',
            iconColor: '#FD3131',
            showConfirmButton: false,
            width: '25rem',
            heightAuto: false
        })

    }  else {

        validation = true

    }

    return validation

}

const updateProfileIconFun = async() => {
 
    if(editInputValidation()){

        let icon = {
            nome: editNameInput.value,
            id_categoria_foto_perfil: editCategoryInput.value
        }

        if(editImageInput.files.length > 0){
            icon.foto = localStorage.getItem('editImageUrl')
        }else{
            icon.foto = localStorage.getItem('editProfileIconImageUrl')
        }

        const rsUpdate = await updateProfileIcon(icon, localStorage.getItem('editProfileIconId'))

        const profileIcons = await getProfileIcons()
        profileIconsARRAY = profileIcons.fotos
        setProfileIcons(profileIcons.fotos)
    
        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-dark_gray"> Foto de Perfil atualizada com sucesso <p>',
            icon: 'success',
            iconColor: '#3064B4',
            showConfirmButton: false,
            width: '25rem',
            heightAuto: false
        })


    }

}

searchBar.addEventListener('keyup', (e) => {

    const search = e.target.value.toLowerCase()
    const filteredIcons = profileIconsARRAY.filter((icon) => {
        return (
            icon.nome.toLowerCase().includes(search) ||
            icon.categoria.toLowerCase().includes(search)
        )
    })
    setProfileIcons(filteredIcons)

})

buttonCreateProfileIcon.addEventListener('click', addPostProfileIconContainer)
buttonClosePostProfileIconContainer.addEventListener('click', closePostProfileIconContainer)
buttonCloseEditProfileIconContainer.addEventListener('click', closeEditProfileIconContainer)
buttonRegisterProfileIcon.addEventListener('click', postProfileIconFun)
buttonDeleteProfileIcon.addEventListener('click', deleteProfileIconFun)
editImageInput.addEventListener('change', (e) => { changeEditProfileIconImagePreview(e.target) })
buttonSaveEditProfileIcon.addEventListener('click', updateProfileIconFun)

window.addEventListener('load', async () => {

    const profileIcons = await getProfileIcons()
    profileIconsARRAY = profileIcons.fotos
    setProfileIcons(profileIcons.fotos)

    const categoriesJSON = await getProfileIconsCategories()
    setCategories(categoriesJSON.categorias)

    closeLoading()

})
