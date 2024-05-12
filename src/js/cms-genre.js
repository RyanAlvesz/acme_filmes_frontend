'use strict'

import { getGenres, postGenre, updateGenre, deleteGenre } from './functions.js'
import { closeLoading } from './loading.js'

const genreSection = document.getElementById('genres-section')
const buttonCreateGenre = document.getElementById('create-genre')
const postGenreContainer = document.getElementById('post-genre-container')
const buttonClosePostGenreContainer = document.getElementById('close-post-genre')
const editGenreContainer = document.getElementById('edit-genre-container')
const buttonCloseEditGenreContainer = document.getElementById('close-edit-genre')
const searchBar = document.getElementById('search')

// Post input
const nameInput = document.getElementById('name')
const buttonRegisterGenre = document.getElementById('button-register-genre')

// Edit Input
const editNameInput = document.getElementById('edit-name')
const buttonSaveEditGenre = document.getElementById('button-edit-genre')
const buttonDeleteGenre = document.getElementById('button-delete-genre')

let genresARRAY

const createGenreCard = (genre) => {

    const card = document.createElement('div')
    card.classList.add('bg-dark_gray', 'h-fit', 'w-[calc((80vw-3.5rem-(1rem*3))/4)]', 'h-fit', 'overflow-hidden', 'rounded-md', 'p-3', 'py-5', 'flex', 'items-center', 'justify-center', 'ease-linear', 'duration-200', 'hover:scale-[1.01]', 'cursor-pointer')
    
    card.addEventListener('click', () => {
        setEditGenre(genre)
        localStorage.setItem('editGenreId', genre.id)
        editGenreContainer.classList.remove('hidden')
        editGenreContainer.classList.add('fixed')
    })

    const genreName = document.createElement('h2')
    genreName.classList.add('text-white','font-semibold', 'text-2xl', 'drop-shadow-[-1px_1px_0px_#ff0000]','text-center')
    genreName.textContent = genre.nome

    card.replaceChildren(genreName)

    return card

}

const setGenres = (genres) => {

    genreSection.replaceChildren('')
    genres.forEach((genre) => {
        const genreCard = createGenreCard(genre)
        genreSection.appendChild(genreCard)
    })

}

const addPostGenreContainer = () => {
    postGenreContainer.classList.add('fixed')
    postGenreContainer.classList.remove('hidden')
}

const closePostGenreContainer = () => {
    postGenreContainer.classList.remove('fixed')
    postGenreContainer.classList.add('hidden')
    clearPostGenreContainer()
}

const clearPostGenreContainer = () => {

    nameInput.value = ''

}

const closeEditGenreContainer = () => {
    editGenreContainer.classList.add('hidden')
    editGenreContainer.classList.remove('fixed')
}

const postGenreFun = async() => {

    if(postInputValidation()){
        
        Swal.fire({
            position: 'center',
            title: '<p class="text-2xl text-dark_gray"> Cadastrando Gênero... <p>',
            imageUrl: "../../images/logo.png",
            imageWidth: '60%',
            imageAlt: "Logo acme",
            showConfirmButton: false,
            padding: '0 0 28px 0',
            width: '30rem',
            heightAuto: false
        })
    
        const genre = {
            nome: nameInput.value
        }
        
        const rsPost = await postGenre(genre)
        
        const genres = await getGenres()
        genresARRAY = genres.generos
        setGenres(genres.generos)
    
        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-dark_gray"> Gênero cadastrado com sucesso! <p>',
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

const setEditGenre = (genre) => {

    editNameInput.value = genre.nome

}

const deleteGenreFun = () => {

    const swalWithBootstrapButtons = Swal.mixin({

        customClass: {
            confirmButton: 'bg-secundary rounded-lg px-6 h-10 w-44 text-lg text-white max-md:text-base max-md:w-32',
            cancelButton: 'bg-main rounded-lg px-6 h-10 w-44 text-lg text-white mr-6 max-md:text-base max-md:w-32'
        },
        buttonsStyling: false,
        heightAuto: false

    })

    swalWithBootstrapButtons.fire({

        title: '<p class="text-2xl text-secundary font-poppins"> Tem certeza que deseja excluir esse gênero? </p>',
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

            const rsDelete = await deleteGenre(localStorage.getItem('editGenreId'))
            const genres = await getGenres()
            genresARRAY = genres.generos
            setGenres(genres.generos)        
            closeEditGenreContainer()

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

const updateGenreFun = async() => {
 
    if(editInputValidation()){

        let genre = {
            nome: editNameInput.value,
        }

        const rsUpdate = await updateGenre(genre, localStorage.getItem('editGenreId'))

        const genres = await getGenres()
        genresARRAY = genres.generos
        setGenres(genres.generos)
            
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
    const filteredGenres = genresARRAY.filter((genre) => {
        return (
            genre.nome.toLowerCase().includes(search)
        )
    })
    setGenres(filteredGenres)

})

buttonCreateGenre.addEventListener('click', addPostGenreContainer)
buttonClosePostGenreContainer.addEventListener('click', closePostGenreContainer)
buttonCloseEditGenreContainer.addEventListener('click', closeEditGenreContainer)
buttonRegisterGenre.addEventListener('click', postGenreFun)
buttonDeleteGenre.addEventListener('click', deleteGenreFun)
buttonSaveEditGenre.addEventListener('click', updateGenreFun)

window.addEventListener('load', async () => {

    const genres = await getGenres()
    genresARRAY = genres.generos
    setGenres(genres.generos)

    closeLoading()

})
