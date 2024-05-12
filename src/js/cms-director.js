'use strict'

import { getDirectors, postDirector, updateDirector, deleteDirector } from './functions.js'
import { closeLoading } from './loading.js'

const directorsSection = document.getElementById('directors-section')
const buttonCreateDirector = document.getElementById('create-director')
const postDirectorContainer = document.getElementById('post-director-container')
const buttonClosePostDirectorContainer = document.getElementById('close-post-director')
const editDirectorContainer = document.getElementById('edit-director-container')
const buttonCloseEditDirectorContainer = document.getElementById('close-edit-director')
const searchBar = document.getElementById('search')

// Post input
const nameInput = document.getElementById('name')
const buttonRegisterDirector = document.getElementById('button-register-director')

// Edit Input
const editNameInput = document.getElementById('edit-name')
const buttonSaveEditDirector = document.getElementById('button-edit-director')
const buttonDeleteDirector = document.getElementById('button-delete-director')

let directorsARRAY

const createDirectorCard = (director) => {

    const card = document.createElement('div')
    card.classList.add('bg-dark_gray', 'h-fit', 'w-[calc((80vw-3.5rem-(1rem*3))/4)]', 'h-fit', 'overflow-hidden', 'rounded-md', 'p-3', 'py-5', 'flex', 'items-center', 'justify-center', 'ease-linear', 'duration-200', 'hover:scale-[1.01]', 'cursor-pointer')
    
    card.addEventListener('click', () => {
        setEditDirector(director)
        localStorage.setItem('editDirectorId', director.id)
        editDirectorContainer.classList.remove('hidden')
        editDirectorContainer.classList.add('fixed')
    })

    const directorName = document.createElement('h2')
    directorName.classList.add('text-white','font-semibold', 'text-2xl', 'drop-shadow-[-1px_1px_0px_#ff0000]','text-center')
    directorName.textContent = director.nome

    card.replaceChildren(directorName)

    return card

}

const setDirectors = (directors) => {

    directorsSection.replaceChildren('')
    directors.forEach((director) => {
        const directorCard = createDirectorCard(director)
        directorsSection.appendChild(directorCard)
    })

}

const addPostDirectorContainer = () => {
    postDirectorContainer.classList.add('fixed')
    postDirectorContainer.classList.remove('hidden')
}

const closePostDirectorContainer = () => {
    postDirectorContainer.classList.remove('fixed')
    postDirectorContainer.classList.add('hidden')
    clearPostDirectorContainer()
}

const clearPostDirectorContainer = () => {

    nameInput.value = ''

}

const closeEditDirectorContainer = () => {
    editDirectorContainer.classList.add('hidden')
    editDirectorContainer.classList.remove('fixed')
}

const postDirectorFun = async() => {

    if(postInputValidation()){
        
        Swal.fire({
            position: 'center',
            title: '<p class="text-2xl text-dark_gray"> Cadastrando Diretor... <p>',
            imageUrl: "../../images/logo.png",
            imageWidth: '60%',
            imageAlt: "Logo acme",
            showConfirmButton: false,
            padding: '0 0 28px 0',
            width: '30rem',
            heightAuto: false
        })
    
        const director = {
            nome: nameInput.value
        }
        
        const rsPost = await postDirector(director)
        
        const directors = await getDirectors()
        directorsARRAY = directors.diretores
        setDirectors(directors.diretores)
    
        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-dark_gray"> Diretor cadastrado com sucesso! <p>',
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

const setEditDirector = (director) => {

    editNameInput.value = director.nome

}

const deleteDirectorFun = () => {

    const swalWithBootstrapButtons = Swal.mixin({

        customClass: {
            confirmButton: 'bg-secundary rounded-lg px-6 h-10 w-44 text-lg text-white max-md:text-base max-md:w-32',
            cancelButton: 'bg-main rounded-lg px-6 h-10 w-44 text-lg text-white mr-6 max-md:text-base max-md:w-32'
        },
        buttonsStyling: false,
        heightAuto: false

    })

    swalWithBootstrapButtons.fire({

        title: '<p class="text-2xl text-secundary font-poppins"> Tem certeza que deseja excluir esse diretor? </p>',
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

            const rsDelete = await deleteDirector(localStorage.getItem('editDirectorId'))
            const directors = await getDirectors()
            directorsARRAY = directors.diretores
            setDirectors(directors.diretores)        
            closeEditDirectorContainer()

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

const updateDirectorFun = async() => {
 
    if(editInputValidation()){

        let director = {
            nome: editNameInput.value,
        }

        const rsUpdate = await updateDirector(director, localStorage.getItem('editDirectorId'))

        const directors = await getDirectors()
        directorsARRAY = directors.diretores
        setDirectors(directors.diretores)
            
        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-dark_gray"> Gênero atualizado com sucesso <p>',
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
    const filteredDirectors = directorsARRAY.filter((director) => {
        return (
            director.nome.toLowerCase().includes(search)
        )
    })
    setDirectors(filteredDirectors)

})

buttonCreateDirector.addEventListener('click', addPostDirectorContainer)
buttonClosePostDirectorContainer.addEventListener('click', closePostDirectorContainer)
buttonCloseEditDirectorContainer.addEventListener('click', closeEditDirectorContainer)
buttonRegisterDirector.addEventListener('click', postDirectorFun)
buttonDeleteDirector.addEventListener('click', deleteDirectorFun)
buttonSaveEditDirector.addEventListener('click', updateDirectorFun)

window.addEventListener('load', async () => {

    const directors = await getDirectors()
    directorsARRAY = directors.diretores
    setDirectors(directors.diretores) 

    closeLoading()

})
