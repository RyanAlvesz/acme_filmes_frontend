'use strict'

import { getProfileIconsCategories, postProfileIconCategory, updateProfileIconCategory, deleteProfileIconCategory } from './functions.js'
import { closeLoading } from './loading.js'

const profileIconsCategoriesSection = document.getElementById('profile-icons-categories-section')
const buttonCreateProfileIconCategory = document.getElementById('create-profile-icon-category')
const postProfileIconCategoryContainer = document.getElementById('post-profile-icon-category-container')
const buttonClosePostProfileIconCategoryContainer = document.getElementById('close-post-profile-icon-category')
const editProfileIconCategoryContainer = document.getElementById('edit-profile-icon-category-container')
const buttonCloseEditProfileIconCategoryContainer = document.getElementById('close-edit-profile-icon-category')
const searchBar = document.getElementById('search')

// Post input
const nameInput = document.getElementById('name')
const buttonRegisterProfileIconCategory = document.getElementById('button-register-profile-icon-category')

// Edit Input
const editNameInput = document.getElementById('edit-name')
const buttonSaveEditProfileIconCategory = document.getElementById('button-edit-profile-icon-category')
const buttonDeleteProfileIconCategory = document.getElementById('button-delete-profile-icon-category')

let profileIconCategorysARRAY

const createProfileIconCategoryCard = (category) => {

    const card = document.createElement('div')
    card.classList.add('bg-dark_gray', 'h-fit', 'w-[calc((80vw-3.5rem-(1rem*2))/3)]', 'h-fit', 'overflow-hidden', 'rounded-md', 'p-3', 'py-5', 'flex', 'items-center', 'justify-center', 'ease-linear', 'duration-200', 'hover:scale-[1.01]', 'cursor-pointer')
    
    card.addEventListener('click', () => {
        setEditProfileIconCategory(category)
        localStorage.setItem('editProfileIconCategoryId', category.id)
        editProfileIconCategoryContainer.classList.remove('hidden')
        editProfileIconCategoryContainer.classList.add('fixed')
    })

    const profileIconCategoryName = document.createElement('h2')
    profileIconCategoryName.classList.add('text-white','font-semibold', 'text-2xl', 'drop-shadow-[-1px_1px_0px_#ff0000]','text-center')
    profileIconCategoryName.textContent = category.nome

    card.replaceChildren(profileIconCategoryName)

    return card

}

const setProfileIconsCategories = (categories) => {

    profileIconsCategoriesSection.replaceChildren('')
    categories.forEach((category) => {
        const categoryCard = createProfileIconCategoryCard(category)
        profileIconsCategoriesSection.appendChild(categoryCard)
    })

}

const addPostProfileIconCategoryContainer = () => {
    postProfileIconCategoryContainer.classList.add('fixed')
    postProfileIconCategoryContainer.classList.remove('hidden')
}

const closePostProfileIconCategoryContainer = () => {
    postProfileIconCategoryContainer.classList.remove('fixed')
    postProfileIconCategoryContainer.classList.add('hidden')
    clearPostProfileIconCategoryContainer()
}

const clearPostProfileIconCategoryContainer = () => {
    nameInput.value = ''
}

const closeEditProfileIconCategoryContainer = () => {
    editProfileIconCategoryContainer.classList.add('hidden')
    editProfileIconCategoryContainer.classList.remove('fixed')
}

const postProfileIconCategoryFun = async() => {

    if(postInputValidation()){
        
        Swal.fire({
            position: 'center',
            title: '<p class="text-2xl text-dark_gray"> Cadastrando Categoria... <p>',
            imageUrl: "../../images/logo.png",
            imageWidth: '60%',
            imageAlt: "Logo acme",
            showConfirmButton: false,
            padding: '0 0 28px 0',
            width: '30rem',
            heightAuto: false
        })
    
        const category = {
            nome: nameInput.value
        }
        
        const rsPost = await postProfileIconCategory(category)
        
        const categories = await getProfileIconsCategories()
        profileIconCategorysARRAY = categories.categorias
        setProfileIconsCategories(categories.categorias)
    
        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-dark_gray"> Categoria cadastrada com sucesso! <p>',
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

    if (nameInput.value == '') {

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

const setEditProfileIconCategory = (category) => {

    editNameInput.value = category.nome

}

const deleteProfileIconCategoryFun = () => {

    const swalWithBootstrapButtons = Swal.mixin({

        customClass: {
            confirmButton: 'bg-secundary rounded-lg px-6 h-10 w-44 text-lg text-white max-md:text-base max-md:w-32',
            cancelButton: 'bg-main rounded-lg px-6 h-10 w-44 text-lg text-white mr-6 max-md:text-base max-md:w-32'
        },
        buttonsStyling: false,
        heightAuto: false

    })

    swalWithBootstrapButtons.fire({

        title: '<p class="text-2xl text-secundary font-poppins"> Tem certeza que deseja excluir essa categoria? </p>',
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

            const rsDelete = await deleteProfileIconCategory(localStorage.getItem('editProfileIconCategoryId'))
            const categories = await getProfileIconsCategories()
            profileIconCategorysARRAY = categories.categorias
            setProfileIconsCategories(categories.categorias)      
            closeEditProfileIconCategoryContainer()

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

const updateProfileIconCategoryFun = async() => {
 
    if(editInputValidation()){

        let category = {
            nome: editNameInput.value,
        }

        const rsUpdate = await updateProfileIconCategory(category, localStorage.getItem('editProfileIconCategoryId'))

        const categories = await getProfileIconsCategories()
        profileIconCategorysARRAY = categories.categorias
        setProfileIconsCategories(categories.categorias)

        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-dark_gray"> Categoria atualizada com sucesso <p>',
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
    const filteredCategories = profileIconCategorysARRAY.filter((category) => {
        return (
            category.nome.toLowerCase().includes(search)
        )
    })
    setProfileIconsCategories(filteredCategories)

})

buttonCreateProfileIconCategory.addEventListener('click', addPostProfileIconCategoryContainer)
buttonClosePostProfileIconCategoryContainer.addEventListener('click', closePostProfileIconCategoryContainer)
buttonCloseEditProfileIconCategoryContainer.addEventListener('click', closeEditProfileIconCategoryContainer)
buttonRegisterProfileIconCategory.addEventListener('click', postProfileIconCategoryFun)
buttonDeleteProfileIconCategory.addEventListener('click', deleteProfileIconCategoryFun)
buttonSaveEditProfileIconCategory.addEventListener('click', updateProfileIconCategoryFun)

window.addEventListener('load', async () => {

    const categories = await getProfileIconsCategories()
    profileIconCategorysARRAY = categories.categorias
    setProfileIconsCategories(categories.categorias)

    closeLoading()

})
