'use strict'

import { getActors, postActor, updateActor, deleteActor } from './functions.js'
import { uploadImage } from './firebase.js'
import { closeLoading } from './loading.js'

const actorsSection = document.getElementById('actors-section')
const buttonCreateActor = document.getElementById('create-actor')
const postActorContainer = document.getElementById('post-actor-container')
const buttonClosePostActorContainer = document.getElementById('close-post-actor')
const editActorContainer = document.getElementById('edit-actor-container')
const buttonCloseEditActorContainer = document.getElementById('close-edit-actor')
const searchBar = document.getElementById('search')

// Post input
const nameInput = document.getElementById('name')
const biographyInput = document.getElementById('biography')
const birthDateInput = document.getElementById('birth-date')
const deathDateInput = document.getElementById('death-date')
const imageInput = document.getElementById('image')
const buttonRegisterActor = document.getElementById('button-register-actor')

// Edit Input
const editNameInput = document.getElementById('edit-name')
const editBiographyInput = document.getElementById('edit-biography')
const editBirthDateInput = document.getElementById('edit-birth-date')
const editDeathDateInput = document.getElementById('edit-death-date')
const editImageInput = document.getElementById('edit-image')
const buttonSaveEditActor = document.getElementById('button-edit-actor')
const buttonDeleteActor = document.getElementById('button-delete-actor')

let actorsARRAY

const createActorCard = (actor) => {

    const card = document.createElement('div')
    card.classList.add('bg-dark_gray', 'h-fit', 'w-[calc((80vw-3.5rem-1rem)/3)]', 'overflow-hidden', 'rounded-md', 'p-3', 'gap-3', 'grid', 'grid-cols-[auto_1fr]', 'ease-linear', 'duration-200', 'hover:scale-[1.01]', 'cursor-pointer')
    card.addEventListener('click', () => {
        setEditActor(actor)
        localStorage.setItem('editActorId', actor.id)
        localStorage.setItem('editActorImageUrl', actor.foto)
        editActorContainer.classList.remove('hidden')
        editActorContainer.classList.add('fixed')
    })

    const actorImage = document.createElement('img')
    actorImage.classList.add('w-[calc(((80vw-3.5rem-1rem)/3-1.5rem)/3)]', 'h-[calc((((80vw-3.5rem-1rem)/3-1.5rem)/3)*45/30)]', 'object-cover', 'rounded-md')
    actorImage.src = actor.foto
    actorImage.alt = actor.nome

    const div = document.createElement('div')
    div.classList.add('flex', 'flex-col', 'text-white', 'items-center', 'justify-center', 'gap-2')

    const actorName = document.createElement('h2')
    actorName.classList.add('font-semibold', 'text-2xl', 'drop-shadow-[-1px_1px_0px_#ff0000]','text-center')
    actorName.textContent = actor.nome

    const actorBirth = document.createElement('span')
    actorBirth.classList.add('font-semibold', 'text-lg')

    const DateTime = luxon.DateTime
    let dt = DateTime.fromISO(actor.data_nascimento)
    actorBirth.textContent = dt.toLocaleString(DateTime.DATE_SHORT)

    card.replaceChildren(actorImage, div)
    div.replaceChildren(actorName, actorBirth)

    return card

}

const setActors = (actors) => {

    actorsSection.replaceChildren('')
    actors.forEach((actor) => {
        const actorCard = createActorCard(actor)
        actorsSection.appendChild(actorCard)
    })

}

const addPostActorContainer = () => {
    postActorContainer.classList.add('fixed')
    postActorContainer.classList.remove('hidden')
}

const closePostActorContainer = () => {
    postActorContainer.classList.remove('fixed')
    postActorContainer.classList.add('hidden')
    clearPostActorContainer()
}

const clearPostActorContainer = () => {

    nameInput.value = ''
    biographyInput.value = ''
    birthDateInput.value = '2020-01-01'
    deathDateInput.value = ''
    imageInput.value = ''

}

const closeEditActorContainer = () => {
    editActorContainer.classList.add('hidden')
    editActorContainer.classList.remove('fixed')
}

const postActorFun = async() => {

    if(postInputValidation()){
        
        Swal.fire({
            position: 'center',
            title: '<p class="text-2xl text-dark_gray"> Cadastrando ator... <p>',
            imageUrl: "../../images/logo.png",
            imageWidth: '60%',
            imageAlt: "Logo acme",
            showConfirmButton: false,
            padding: '0 0 28px 0',
            width: '30rem',
            heightAuto: false
        })

        const imageUrl = await getPostImageUrl()
    
        const actor = {
            nome: nameInput.value,
            foto: imageUrl,
            biografia: biographyInput.value,
            data_nascimento: birthDateInput.value,
            data_falecimento: deathDateInput.value
        }

        if(deathDateInput.value == ''){
            actor.data_falecimento = null
        }
    
        const rsPost = await postActor(actor)
        const actors = await getActors()
        actorsARRAY = actors.atores
        setActors(actors.atores)

        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-dark_gray"> Ator cadastrado com sucesso! <p>',
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
        biographyInput.value == '' ||
        birthDateInput.value == '' ||
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

    const url = await uploadImage(file, 'actors')
    return url

}

const getPostImageUrl = async () => {

    const imageUrl = await getImageUrl(imageInput.files[0])
    return imageUrl

}

const setEditActor = (actor) => {

    editImageInput.value = ''

    editNameInput.value = actor.nome
    editBiographyInput.value = actor.biografia
    editBirthDateInput.value = actor.data_nascimento
    editDeathDateInput.value = actor.data_falecimento
    editImageInput.previousElementSibling.src = actor.foto

}

const changeEditActorImagePreview = async(input) => {

    const url = await getImageUrl(input.files[0])
    input.previousElementSibling.src = url
    localStorage.setItem('editImageUrl', url)

}

const deleteActorFun = () => {

    const swalWithBootstrapButtons = Swal.mixin({

        customClass: {
            confirmButton: 'bg-secundary rounded-lg px-6 h-10 w-44 text-lg text-white max-md:text-base max-md:w-32',
            cancelButton: 'bg-main rounded-lg px-6 h-10 w-44 text-lg text-white mr-6 max-md:text-base max-md:w-32'
        },
        buttonsStyling: false,
        heightAuto: false

    })

    swalWithBootstrapButtons.fire({

        title: '<p class="text-2xl text-secundary font-poppins"> Tem certeza que deseja excluir esse ator? </p>',
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

            const rsDelete = await deleteActor(localStorage.getItem('editActorId'))
            const actors = await getActors()
            actorsARRAY = actors.atores
            setActors(actors.atores)
            closeEditActorContainer()

        }

    }) 

}

const editInputValidation = () => {

    let validation = false

    if (
        editNameInput.value == '' ||
        editBiographyInput.value == '' ||
        editBirthDateInput.value == ''
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

const updateActorFun = async() => {
 
    if(editInputValidation()){

        let actor = {
            nome: editNameInput.value,
            biografia: editBiographyInput.value,
            data_nascimento: editBirthDateInput.value,
        }

        if(editDeathDateInput.value = ''){
            actor.data_falecimento = null
        } else {
            actor.data_falecimento = editDeathDateInput.value
        }

        if(editImageInput.files.length > 0){
            actor.foto = localStorage.getItem('editImageUrl')
        }else{
            actor.foto = localStorage.getItem('editActorImageUrl')
        }

        const rsUpdate = await updateActor(actor, localStorage.getItem('editActorId'))

        const actors = await getActors()
        actorsARRAY = actors.atores
        setActors(actors.atores)

        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-dark_gray"> Ator atualizado com sucesso <p>',
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
    const filteredActors = actorsARRAY.filter((actor) => {
        return (
            actor.nome.toLowerCase().includes(search)
        )
    })
    setActors(filteredActors)

})

buttonCreateActor.addEventListener('click', addPostActorContainer)
buttonClosePostActorContainer.addEventListener('click', closePostActorContainer)
buttonCloseEditActorContainer.addEventListener('click', closeEditActorContainer)
buttonRegisterActor.addEventListener('click', postActorFun)
buttonDeleteActor.addEventListener('click', deleteActorFun)
editImageInput.addEventListener('change', (e) => { changeEditActorImagePreview(e.target) })
buttonSaveEditActor.addEventListener('click', updateActorFun)

window.addEventListener('load', async () => {

    const actors = await getActors()
    actorsARRAY = actors.atores
    setActors(actors.atores)

    closeLoading()

})
