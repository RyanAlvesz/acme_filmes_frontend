'use strict'

import { getClassifications, postClassification, updateClassification, deleteClassification } from './functions.js'
import { uploadImage } from './firebase.js'
import { closeLoading } from './loading.js'

const classificationsSection = document.getElementById('classifications-section')
const buttonCreateClassification = document.getElementById('create-classification')
const postClassificationContainer = document.getElementById('post-classification-container')
const buttonClosePostClassificationContainer = document.getElementById('close-post-classification')
const editClassificationContainer = document.getElementById('edit-classification-container')
const buttonCloseEditClassificationContainer = document.getElementById('close-edit-classification')
const searchBar = document.getElementById('search')

// Post input
const acronymInput = document.getElementById('acronym')
const parentalRatingInput = document.getElementById('parental-rating')
const descriptionInput = document.getElementById('description')
const imageInput = document.getElementById('image')
const buttonRegisterClassification = document.getElementById('button-register-classification')

// Edit Input
const editAcronymInput = document.getElementById('edit-acronym')
const editParentalRatingInput = document.getElementById('edit-parental-rating')
const editDescriptionInput = document.getElementById('edit-description')
const editImageInput = document.getElementById('edit-image')
const buttonSaveEditClassification = document.getElementById('button-edit-classification')
const buttonDeleteClassification = document.getElementById('button-delete-classification')

let classificationARRAY

const createClassificationCard = (classification) => {

    const card = document.createElement('div')
    card.classList.add('bg-dark_gray', 'w-[calc((80vw-3.5rem-(0.5rem*3))/4)]', 'h-fit', 'overflow-hidden', 'rounded-lg', 'p-3', 'gap-3', 'flex', 'ease-linear', 'duration-200', 'hover:scale-[1.01]', 'cursor-pointer')
    
    card.addEventListener('click', () => {
        setEditClassification(classification)
        localStorage.setItem('editClassificationId', classification.id)
        localStorage.setItem('editClassificationImageUrl', classification.icone)
        editClassificationContainer.classList.remove('hidden')
        editClassificationContainer.classList.add('fixed')
    })

    const classificationImage = document.createElement('img')
    classificationImage.classList.add('w-[calc((((80vw-3.5rem-(0.5rem*3))/4)/3)-1.5rem)]', 'h-[calc((((80vw-3.5rem-(0.5rem*3))/4)/3)-1.5rem)]', 'object-cover', 'rounded-md')
    classificationImage.src = classification.icone
    classificationImage.alt = classification.sigla

    const div = document.createElement('div')
    div.classList.add('flex', 'text-white', 'items-center', 'justify-center', 'w-full')

    const classificationDescription = document.createElement('h3')
    classificationDescription.classList.add('font-semibold', 'text-sm','text-center')
    classificationDescription.textContent = classification.classificacao_indicativa

    card.replaceChildren(classificationImage, div)
    div.appendChild(classificationDescription)

    return card

}

const setClassifications = (classifications) => {

    classificationsSection.replaceChildren('')
    classifications.forEach((classification) => {
        const classificationCard = createClassificationCard(classification)
        classificationsSection.appendChild(classificationCard)
    })

}

const addPostClassificationContainer = () => {
    postClassificationContainer.classList.add('fixed')
    postClassificationContainer.classList.remove('hidden')
}

const closePostClassificationContainer = () => {
    postClassificationContainer.classList.remove('fixed')
    postClassificationContainer.classList.add('hidden')
    clearPostClassificationContainer()
}

const clearPostClassificationContainer = () => {

    acronymInput.value = ''
    parentalRatingInput.value = ''
    descriptionInput.value = ''
    imageInput.value = ''

}

const closeEditClassificationContainer = () => {
    editClassificationContainer.classList.add('hidden')
    editClassificationContainer.classList.remove('fixed')
}

const postClassificationFun = async() => {

    if(postInputValidation()){
        
        Swal.fire({
            position: 'center',
            title: '<p class="text-2xl text-dark_gray"> Cadastrando Classificação... <p>',
            imageUrl: "../../images/logo.png",
            imageWidth: '60%',
            imageAlt: "Logo acme",
            showConfirmButton: false,
            padding: '0 0 28px 0',
            width: '30rem',
            heightAuto: false
        })

        const imageUrl = await getPostImageUrl()
    
        const classification = {
            sigla: acronymInput.value,
            descricao: descriptionInput.value,
            classificacao_indicativa: parentalRatingInput.value,
            icone: imageUrl
        }
        
        const rsPost = await postClassification(classification)

        const classifications = await getClassifications()
        classificationARRAY = classifications.classificacoes
        setClassifications(classifications.classificacoes)
    
        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-dark_gray"> Classificação cadastrada com sucesso! <p>',
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
        acronymInput.value == '' ||
        parentalRatingInput.value == '' ||
        descriptionInput.value == '' ||
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

    const url = await uploadImage(file, 'ratings')
    return url

}

const getPostImageUrl = async () => {

    const imageUrl = await getImageUrl(imageInput.files[0])
    return imageUrl

}

const setEditClassification = (classification) => {

    editImageInput.value = ''

    editAcronymInput.value = classification.sigla
    editDescriptionInput.value = classification.descricao
    editParentalRatingInput.value = classification.classificacao_indicativa
    editImageInput.previousElementSibling.src = classification.icone

}

const changeEditClassificationImagePreview = async(input) => {

    const url = await getImageUrl(input.files[0])
    input.previousElementSibling.src = url
    localStorage.setItem('editImageUrl', url)

}

const deleteClassificationFun = () => {

    const swalWithBootstrapButtons = Swal.mixin({

        customClass: {
            confirmButton: 'bg-secundary rounded-lg px-6 h-10 w-44 text-lg text-white max-md:text-base max-md:w-32',
            cancelButton: 'bg-main rounded-lg px-6 h-10 w-44 text-lg text-white mr-6 max-md:text-base max-md:w-32'
        },
        buttonsStyling: false,
        heightAuto: false

    })

    swalWithBootstrapButtons.fire({

        title: '<p class="text-2xl text-secundary font-poppins"> Tem certeza que deseja excluir essa classificação? </p>',
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

            const rsDelete = await deleteClassification(localStorage.getItem('editClassificationId'))
            const classifications = await getClassifications()
            classificationARRAY = classifications.classificacoes
            setClassifications(classifications.classificacoes)
            closeEditClassificationContainer()

        }

    }) 

}

const editInputValidation = () => {

    let validation = false

    if (
        editAcronymInput.value == '' ||
        editDescriptionInput.value == '' ||
        editParentalRatingInput.value == '' 
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

const updateClassificationFun = async() => {
 
    if(editInputValidation()){

        let classification = {
            sigla: editAcronymInput.value,
            descricao: editDescriptionInput.value,
            classificacao_indicativa: editParentalRatingInput.value
        }

        if(editImageInput.files.length > 0){
            classification.icone = localStorage.getItem('editImageUrl')
        }else{
            classification.icone = localStorage.getItem('editClassificationImageUrl')
        }

        const rsUpdate = await updateClassification(classification, localStorage.getItem('editClassificationId'))

        const classifications = await getClassifications()
        classificationARRAY = classifications.classificacoes
        setClassifications(classifications.classificacoes)
        
        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-dark_gray"> Classificação atualizada com sucesso <p>',
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
    const filteredClassifications = classificationARRAY.filter((classificaton) => {
        return (
            classificaton.sigla.toLowerCase().includes(search) 
        )
    })
    setClassifications(filteredClassifications)

})

buttonCreateClassification.addEventListener('click', addPostClassificationContainer)
buttonClosePostClassificationContainer.addEventListener('click', closePostClassificationContainer)
buttonCloseEditClassificationContainer.addEventListener('click', closeEditClassificationContainer)
buttonRegisterClassification.addEventListener('click', postClassificationFun)
buttonDeleteClassification.addEventListener('click', deleteClassificationFun)
editImageInput.addEventListener('change', (e) => { changeEditClassificationImagePreview(e.target) })
buttonSaveEditClassification.addEventListener('click', updateClassificationFun)

window.addEventListener('load', async () => {

    const classifications = await getClassifications()
    classificationARRAY = classifications.classificacoes
    setClassifications(classifications.classificacoes)

    closeLoading()

})
