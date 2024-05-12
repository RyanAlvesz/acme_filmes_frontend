'use strict'

import { getActorsNationalities, postActorNationality, updateActorNationality, deleteActorNationality, getActors, getNationalities } from './functions.js'
import { closeLoading } from './loading.js'

const actorNationalitiesSection = document.getElementById('actor-nationalities-section')
const buttonCreateActorNationality = document.getElementById('create-actor-nationality')
const postActorNationalityContainer = document.getElementById('post-actor-nationality-container')
const buttonClosePostActorNationalityContainer = document.getElementById('close-post-actor-nationality')
const editActorNationalityContainer = document.getElementById('edit-actor-nationality-container')
const buttonCloseEditActorNationality = document.getElementById('close-edit-actor-nationality')
const searchBar = document.getElementById('search')

// Post input
const actorInput = document.getElementById('actor')
const nationalityInput = document.getElementById('nationality')
const buttonRegisterActorNationality = document.getElementById('button-register-actor-nationality')

// Edit Input
const editActorInput = document.getElementById('edit-actor')
const editNationalityInput = document.getElementById('edit-nationality')
const buttonSaveEditActorNationality = document.getElementById('button-edit-actor-nationality')
const buttonDeleteActorNationality = document.getElementById('button-delete-actor-nationality')

let actorNationalityARRAY

const createActorNationalityCard = (actorNationality) => {

    const card = document.createElement('div')
    card.classList.add('bg-dark_gray', 'w-[calc((80vw-3.5rem-(1rem*3))/4)]', 'overflow-hidden', 'rounded-md', 'p-3', 'py-5', 'flex', 'flex-col', 'gap-2', 'items-center', 'justify-center', 'ease-linear', 'duration-200', 'hover:scale-[1.01]', 'cursor-pointer')
    
    card.addEventListener('click', () => {
        setEditActorNationality(actorNationality)
        localStorage.setItem('editActorNationalityId', actorNationality.id)
        editActorNationalityContainer.classList.remove('hidden')
        editActorNationalityContainer.classList.add('fixed')
    })

    const actorName = document.createElement('h2')
    actorName.classList.add('text-white','font-semibold', 'text-xl', 'drop-shadow-[-1px_1px_0px_#ff0000]','text-center')
    actorName.textContent = actorNationality.ator

    const nationalityName = document.createElement('h2')
    nationalityName.classList.add('text-white','font-semibold', 'text-base', 'drop-shadow-[-1px_1px_0px_#3064B4]','text-center')
    nationalityName.textContent = actorNationality.nacionalidade

    card.replaceChildren(actorName, nationalityName)

    return card

}

const setActorNationalities = (actorNationalities) => {

    actorNationalitiesSection.replaceChildren('')
    actorNationalities.forEach((actorNationality) => {
        const actorNationalityCard = createActorNationalityCard(actorNationality)
        actorNationalitiesSection.appendChild(actorNationalityCard)
    })

}

const createOptions = (json) => {

    const option = document.createElement('option')
    if(json.nome){
        option.textContent = json.nome
    }else{
        option.textContent = json.gentilico
    }
    option.value = json.id
    return option

}

const setActors = (actors) => {

    actors.forEach((actor) => {
        const option = createOptions(actor)
        actorInput.appendChild(option)
    })

}

const setNationalities = (nationality) => {

    nationality.forEach((nationality) => {
        const option = createOptions(nationality)
        nationalityInput.appendChild(option)
    })

}

const addPostActorNationalityContainer = () => {
    postActorNationalityContainer.classList.add('fixed')
    postActorNationalityContainer.classList.remove('hidden')
}

const closePostActorNationalityContainer = () => {
    postActorNationalityContainer.classList.remove('fixed')
    postActorNationalityContainer.classList.add('hidden')
}

const closeEditActorNationality = () => {
    editActorNationalityContainer.classList.add('hidden')
    editActorNationalityContainer.classList.remove('fixed')
}

const postActorNationalityFun = async() => {

    if(postInputValidation()){
        
        Swal.fire({
            position: 'center',
            title: '<p class="text-2xl text-dark_gray"> Cadastrando nacionalidade do ator... <p>',
            imageUrl: "../../images/logo.png",
            imageWidth: '60%',
            imageAlt: "Logo acme",
            showConfirmButton: false,
            padding: '0 0 28px 0',
            width: '30rem',
            heightAuto: false
        })
    
        const actorNationality = {
            id_ator: actorInput.value,
            id_nacionalidade: nationalityInput.value
        }
        
        const rsPost = await postActorNationality(actorNationality)
        const actorsNationalities = await getActorsNationalities()    
        actorNationalityARRAY = actorsNationalities.nacionalidades_atores
        setActorNationalities(actorsNationalities.nacionalidades_atores)

        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-dark_gray"> Nacionalidade do ator cadastrada com sucesso! <p>',
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
        actorInput.value == '' ||
        nationalityInput.value == '' 
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

const setEditActors = async (actorID) => {

    const actorsJSON = await getActors()
    editActorInput.replaceChildren('')

    actorsJSON.atores.forEach((actor) => {
        const option = createOptions(actor)
        if (actor.id == actorID) {
            option.setAttribute('selected', true)
        }
        editActorInput.appendChild(option)
    })

}

const setEditNatonalities = async (nationalityID) => {

    const nationalitiesJSON = await getNationalities()
    editNationalityInput.replaceChildren('')

    nationalitiesJSON.nacionalidades.forEach((nationality) => {
        const option = createOptions(nationality)
        if (nationality.id == nationalityID) {
            option.setAttribute('selected', true)
        }
        editNationalityInput.appendChild(option)
    })

}

const setEditActorNationality = (actorNationality) => {

    setEditActors(actorNationality.id_ator)
    setEditNatonalities(actorNationality.id_nacionalidade)

}

const deleteActorNationalityFun = () => {

    const swalWithBootstrapButtons = Swal.mixin({

        customClass: {
            confirmButton: 'bg-secundary rounded-lg px-6 h-10 w-44 text-lg text-white max-md:text-base max-md:w-32',
            cancelButton: 'bg-main rounded-lg px-6 h-10 w-44 text-lg text-white mr-6 max-md:text-base max-md:w-32'
        },
        buttonsStyling: false,
        heightAuto: false

    })

    swalWithBootstrapButtons.fire({

        title: '<p class="text-2xl text-secundary font-poppins"> Tem certeza que deseja excluir essa nacionalidade desse ator? </p>',
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

            const rsDelete = await deleteActorNationality(localStorage.getItem('editActorNationalityId'))
            const actorsNationalities = await getActorsNationalities()    
            actorNationalityARRAY = actorsNationalities.nacionalidades_atores
            setActorNationalities(actorsNationalities.nacionalidades_atores)
            closeEditActorNationality()

        }

    }) 

}

const updateActorNationalityFun = async() => {

    let actorNationality = {
        id_ator: editActorInput.value,
        id_nacionalidade: editNationalityInput.value
    }

    const rsUpdate = await updateActorNationality(actorNationality, localStorage.getItem('editActorNationalityId'))

    const actorsNationalities = await getActorsNationalities()    
    actorNationalityARRAY = actorsNationalities.nacionalidades_atores
    setActorNationalities(actorsNationalities.nacionalidades_atores)

    Swal.fire({
        position: 'center',
        timer: 2000,
        title: '<p class="text-2xl text-dark_gray"> Nacionalidade do ator atualizada com sucesso <p>',
        icon: 'success',
        iconColor: '#3064B4',
        showConfirmButton: false,
        width: '25rem',
        heightAuto: false
    })

}

searchBar.addEventListener('keyup', (e) => {

    const search = e.target.value.toLowerCase()
    const filteredActorNationalities = actorNationalityARRAY.filter((actorNationality) => {
        return (
            actorNationality.ator.toLowerCase().includes(search) ||
            actorNationality.nacionalidade.toLowerCase().includes(search) 
        )
    })
    setActorNationalities(filteredActorNationalities)

})

buttonCreateActorNationality.addEventListener('click', addPostActorNationalityContainer)
buttonClosePostActorNationalityContainer.addEventListener('click', closePostActorNationalityContainer)
buttonCloseEditActorNationality.addEventListener('click', closeEditActorNationality)
buttonRegisterActorNationality.addEventListener('click', postActorNationalityFun)
buttonDeleteActorNationality.addEventListener('click', deleteActorNationalityFun)
buttonSaveEditActorNationality.addEventListener('click', updateActorNationalityFun)

window.addEventListener('load', async () => {

    const actorsNationalities = await getActorsNationalities()
    actorNationalityARRAY = actorsNationalities.nacionalidades_atores
    setActorNationalities(actorsNationalities.nacionalidades_atores)

    const actorsJSON = await getActors()
    setActors(actorsJSON.atores)

    const nationalitiesJSON = await getNationalities()
    setNationalities(nationalitiesJSON.nacionalidades)

    closeLoading()

})
