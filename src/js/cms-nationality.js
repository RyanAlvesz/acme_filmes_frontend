'use strict'

import { getNationalities, postNationality, updateNationality, deleteNationality } from './functions.js'
import { uploadImage } from './firebase.js'
import { closeLoading } from './loading.js'

const nationalitiesSection = document.getElementById('nationalities-section')
const buttonCreateNationality = document.getElementById('create-nationality')
const postNationalityContainer = document.getElementById('post-nationality-container')
const buttonClosePostNationalityContainer = document.getElementById('close-post-nationality')
const editNationalityContainer = document.getElementById('edit-nationality-container')
const buttonCloseEditNationalityContainer = document.getElementById('close-edit-nationality')
const searchBar = document.getElementById('search')

// Post input
const countryInput = document.getElementById('country')
const gentileInput = document.getElementById('gentile')
const imageInput = document.getElementById('image')
const buttonRegisterNationality = document.getElementById('button-register-nationality')

// Edit Input
const editCountryInput = document.getElementById('edit-country')
const editGentileInput = document.getElementById('edit-gentile')
const editImageInput = document.getElementById('edit-image')
const buttonSaveEditNationality = document.getElementById('button-edit-nationality')
const buttonDeleteNationality = document.getElementById('button-delete-nationality')

let nationalityARRAY

const createNationalityCard = (nationality) => {

    const card = document.createElement('div')
    card.classList.add('bg-dark_gray', 'w-[calc((80vw-3.5rem-(0.5rem*5))/6)]', 'overflow-hidden', 'rounded-lg', 'p-3', 'gap-3', 'flex', 'flex-col', 'ease-linear', 'duration-200', 'hover:scale-[1.01]', 'cursor-pointer')
    
    card.addEventListener('click', () => {
        setEditNationality(nationality)
        localStorage.setItem('editNationalityId', nationality.id)
        localStorage.setItem('editNationalityImageUrl', nationality.bandeira)
        editNationalityContainer.classList.remove('hidden')
        editNationalityContainer.classList.add('fixed')
    })

    const nationalityImage = document.createElement('img')
    nationalityImage.classList.add('w-[calc(((80vw-3.5rem-(0.5rem*5))/6)-1.5rem)]', 'h-[calc((((80vw-3.5rem-(0.5rem*5))/6)-1.5rem)/1.42)]', 'object-cover', 'rounded-md')
    nationalityImage.src = nationality.bandeira
    nationalityImage.alt = nationality.gentilico

    const div = document.createElement('div')
    div.classList.add('flex', 'text-white', 'items-center', 'justify-center')

    const nationalityDescription = document.createElement('h3')
    nationalityDescription.classList.add('font-semibold', 'text-xl','drop-shadow-[-1px_1px_0px_#ff0000]','text-center')
    nationalityDescription.textContent = nationality.gentilico

    card.replaceChildren(nationalityImage, div)
    div.appendChild(nationalityDescription)

    return card

}

const setNationalities = (nationalities) => {

    nationalitiesSection.replaceChildren('')
    nationalities.forEach((nationality) => {
        const nationalityCard = createNationalityCard(nationality)
        nationalitiesSection.appendChild(nationalityCard)
    })

}

const addPostNationalityContainer = () => {
    postNationalityContainer.classList.add('fixed')
    postNationalityContainer.classList.remove('hidden')
}

const closePostNationalityContainer = () => {
    postNationalityContainer.classList.remove('fixed')
    postNationalityContainer.classList.add('hidden')
    clearPostNationalityContainer()
}

const clearPostNationalityContainer = () => {

    countryInput.value = ''
    gentileInput.value = ''
    imageInput.value = ''

}

const closeEditNationalityContainer = () => {
    editNationalityContainer.classList.add('hidden')
    editNationalityContainer.classList.remove('fixed')
}

const postNationalityFun = async() => {

    if(postInputValidation()){
        
        Swal.fire({
            position: 'center',
            title: '<p class="text-2xl text-dark_gray"> Cadastrando Nacionalidade... <p>',
            imageUrl: "../../images/logo.png",
            imageWidth: '60%',
            imageAlt: "Logo acme",
            showConfirmButton: false,
            padding: '0 0 28px 0',
            width: '30rem',
            heightAuto: false
        })

        const imageUrl = await getPostImageUrl()
    
        const nationality = {
            pais: countryInput.value,
            nome: gentileInput.value,
            bandeira: imageUrl
        }
        
        const rsPost = await postNationality(nationality)

        const nationalities = await getNationalities()
        nationalityARRAY = nationalities.nacionalidades
        setNationalities(nationalities.nacionalidades)
    
        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-dark_gray"> Nacionalidade cadastrada com sucesso! <p>',
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
        countryInput.value == '' ||
        gentileInput.value == '' ||
        imageInput.files.length == 0 
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

    const url = await uploadImage(file, 'flags')
    return url

}

const getPostImageUrl = async () => {

    const imageUrl = await getImageUrl(imageInput.files[0])
    return imageUrl

}

const setEditNationality = (nationality) => {

    editImageInput.value = ''

    editCountryInput.value = nationality.pais
    editGentileInput.value = nationality.gentilico
    editImageInput.previousElementSibling.src = nationality.bandeira

}

const changeEditNationalityImagePreview = async(input) => {

    const url = await getImageUrl(input.files[0])
    input.previousElementSibling.src = url
    localStorage.setItem('editImageUrl', url)

}

const deleteNationalityFun = () => {

    const swalWithBootstrapButtons = Swal.mixin({

        customClass: {
            confirmButton: 'bg-secundary rounded-lg px-6 h-10 w-44 text-lg text-white max-md:text-base max-md:w-32',
            cancelButton: 'bg-main rounded-lg px-6 h-10 w-44 text-lg text-white mr-6 max-md:text-base max-md:w-32'
        },
        buttonsStyling: false,
        heightAuto: false

    })

    swalWithBootstrapButtons.fire({

        title: '<p class="text-2xl text-secundary font-poppins"> Tem certeza que deseja excluir essa nacionalidade? </p>',
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

            const rsDelete = await deleteNationality(localStorage.getItem('editNationalityId'))
            const nationalities = await getNationalities()
            nationalityARRAY = nationalities.nacionalidades
            setNationalities(nationalities.nacionalidades)
            closeEditNationalityContainer()

        }

    }) 

}

const editInputValidation = () => {

    let validation = false

    if (
        editCountryInput.value == '' ||
        editGentileInput.value == '' 
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

const updateNationalityFun = async() => {
 
    if(editInputValidation()){

        let nationality = {
            pais: editCountryInput.value,
            nome: editGentileInput.value,
        }

        if(editImageInput.files.length > 0){
            nationality.bandeira = localStorage.getItem('editImageUrl')
        }else{
            nationality.bandeira = localStorage.getItem('editNationalityImageUrl')
        }

        const rsUpdate = await updateNationality(nationality, localStorage.getItem('editNationalityId'))

        const nationalities = await getNationalities()
        nationalityARRAY = nationalities.nacionalidades
        setNationalities(nationalities.nacionalidades)
        
        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-dark_gray"> Nacionalidade atualizada com sucesso <p>',
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
    const filteredNationalities = nationalityARRAY.filter((nationality) => {
        return (
            nationality.gentilico.toLowerCase().includes(search) ||
            nationality.pais.toLowerCase().includes(search) 
        )
    })
    setNationalities(filteredNationalities)

})

buttonCreateNationality.addEventListener('click', addPostNationalityContainer)
buttonClosePostNationalityContainer.addEventListener('click', closePostNationalityContainer)
buttonCloseEditNationalityContainer.addEventListener('click', closeEditNationalityContainer)
buttonRegisterNationality.addEventListener('click', postNationalityFun)
buttonDeleteNationality.addEventListener('click', deleteNationalityFun)
editImageInput.addEventListener('change', (e) => { changeEditNationalityImagePreview(e.target) })
buttonSaveEditNationality.addEventListener('click', updateNationalityFun)

window.addEventListener('load', async () => {

    const nationalities = await getNationalities()
    nationalityARRAY = nationalities.nacionalidades
    setNationalities(nationalities.nacionalidades)

    closeLoading()

})
