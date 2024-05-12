'use strict'

import { getDirectorsMovies, postDirectorMovie, updateDirectorMovie, deleteDirectorMovie, getMovies, getDirectors } from './functions.js'
import { closeLoading } from './loading.js'

const movieDirectorsSection = document.getElementById('movie-directors-section')
const buttonCreateMovieDirector = document.getElementById('create-movie-director')
const postMovieDirectorContainer = document.getElementById('post-movie-director-container')
const buttonClosePostMovieDirectorContainer = document.getElementById('close-post-movie-director')
const editMovieDirectorContainer = document.getElementById('edit-movie-director-container')
const buttonCloseEditMovieDirectorContainer = document.getElementById('close-edit-movie-director')
const searchBar = document.getElementById('search')

// Post input
const movieInput = document.getElementById('movie')
const directorInput = document.getElementById('director')
const buttonRegisterMovieDirector = document.getElementById('button-register-movie-director')

// Edit Input
const editMovieInput = document.getElementById('edit-movie')
const editDirectorInput = document.getElementById('edit-director')
const buttonSaveEditMovieDirector = document.getElementById('button-edit-movie-director')
const buttonDeleteMovieDirector = document.getElementById('button-delete-movie-director')

let movieDirectorARRAY

const createMovieDirectorCard = (movieDirector) => {

    const card = document.createElement('div')
    card.classList.add('bg-dark_gray', 'w-[calc((80vw-3.5rem-(1rem*3))/4)]', 'overflow-hidden', 'rounded-md', 'p-3', 'py-5', 'flex', 'flex-col', 'gap-2', 'items-center', 'justify-center', 'ease-linear', 'duration-200', 'hover:scale-[1.01]', 'cursor-pointer')
    
    card.addEventListener('click', () => {
        setEditMovieDirector(movieDirector)
        localStorage.setItem('editMovieDirectorId', movieDirector.id)
        editMovieDirectorContainer.classList.remove('hidden')
        editMovieDirectorContainer.classList.add('fixed')
    })

    const movieName = document.createElement('h2')
    movieName.classList.add('text-white','font-semibold', 'text-xl', 'drop-shadow-[-1px_1px_0px_#ff0000]','text-center')
    movieName.textContent = movieDirector.filme

    const directorName = document.createElement('h2')
    directorName.classList.add('text-white','font-semibold', 'text-base', 'drop-shadow-[-1px_1px_0px_#3064B4]','text-center')
    directorName.textContent = movieDirector.diretor

    card.replaceChildren(movieName, directorName)

    return card

}

const setMovieDirectors = (movieDirectors) => {

    movieDirectorsSection.replaceChildren('')
    movieDirectors.forEach((movieDirector) => {
        const movieDirectorCard = createMovieDirectorCard(movieDirector)
        movieDirectorsSection.appendChild(movieDirectorCard)
    })

}

const createOptions = (json) => {

    const option = document.createElement('option')
    option.textContent = json.nome
    option.value = json.id
    return option

}

const setMovies = (movies) => {

    movies.forEach((movie) => {
        const option = createOptions(movie)
        movieInput.appendChild(option)
    })

}

const setDirectors = (directors) => {

    directors.forEach((director) => {
        const option = createOptions(director)
        directorInput.appendChild(option)
    })

}

const addPostMovieDirectorContainer = () => {
    postMovieDirectorContainer.classList.add('fixed')
    postMovieDirectorContainer.classList.remove('hidden')
}

const closePostMovieDirectorContainer = () => {
    postMovieDirectorContainer.classList.remove('fixed')
    postMovieDirectorContainer.classList.add('hidden')
}

const closeEditMovieDirectorContainer = () => {
    editMovieDirectorContainer.classList.add('hidden')
    editMovieDirectorContainer.classList.remove('fixed')
}

const postMovieDirectorFun = async() => {

    if(postInputValidation()){
        
        Swal.fire({
            position: 'center',
            title: '<p class="text-2xl text-dark_gray"> Cadastrando diretor do filme... <p>',
            imageUrl: "../../images/logo.png",
            imageWidth: '60%',
            imageAlt: "Logo acme",
            showConfirmButton: false,
            padding: '0 0 28px 0',
            width: '30rem',
            heightAuto: false
        })
    
        const movieDirector = {
            id_filme: movieInput.value,
            id_diretor: directorInput.value
        }
        
        const rsPost = await postDirectorMovie(movieDirector)
        const movieDirectors = await getDirectorsMovies()    
        movieDirectorARRAY = movieDirectors.filmes_diretores
        setMovieDirectors(movieDirectors.filmes_diretores)

        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-dark_gray"> Diretor cadastrado no filme com sucesso! <p>',
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
        movieInput.value == '' ||
        directorInput.value == '' 
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

const setEditMovies = async (movieID) => {

    const moviesJSON = await getMovies()
    editMovieInput.replaceChildren('')

    moviesJSON.filmes.forEach((movie) => {
        const option = createOptions(movie)
        if (movie.id == movieID) {
            option.setAttribute('selected', true)
        }
        editMovieInput.appendChild(option)
    })

}

const setEditDirector = async (directorID) => {

    const directorsJSON = await getDirectors()
    editDirectorInput.replaceChildren('')

    directorsJSON.diretores.forEach((director) => {
        const option = createOptions(director)
        if (director.id == directorID) {
            option.setAttribute('selected', true)
        }
        editDirectorInput.appendChild(option)
    })

}

const setEditMovieDirector = (movieDirector) => {

    setEditMovies(movieDirector.id_filme)
    setEditDirector(movieDirector.id_diretor)

}

const deleteMovieDirectorFun = () => {

    const swalWithBootstrapButtons = Swal.mixin({

        customClass: {
            confirmButton: 'bg-secundary rounded-lg px-6 h-10 w-44 text-lg text-white max-md:text-base max-md:w-32',
            cancelButton: 'bg-main rounded-lg px-6 h-10 w-44 text-lg text-white mr-6 max-md:text-base max-md:w-32'
        },
        buttonsStyling: false,
        heightAuto: false

    })

    swalWithBootstrapButtons.fire({

        title: '<p class="text-2xl text-secundary font-poppins"> Tem certeza que deseja excluir esse diretor desse filme? </p>',
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

            const rsDelete = await deleteDirectorMovie(localStorage.getItem('editMovieDirectorId'))
            const movieDirectors = await getDirectorsMovies()    
            movieDirectorARRAY = movieDirectors.filmes_diretores
            setMovieDirectors(movieDirectors.filmes_diretores)
            closeEditMovieDirectorContainer()

        }

    }) 

}

const updateMovieDirectorFun = async() => {

    let movieDirector = {
        id_filme: editMovieInput.value,
        id_diretor: editDirectorInput.value
    }

    const rsUpdate = await updateDirectorMovie(movieDirector, localStorage.getItem('editMovieDirectorId'))

    const movieDirectors = await getDirectorsMovies()    
    movieDirectorARRAY = movieDirectors.filmes_diretores
    setMovieDirectors(movieDirectors.filmes_diretores)

    Swal.fire({
        position: 'center',
        timer: 2000,
        title: '<p class="text-2xl text-dark_gray"> Diretor do filme atualizado com sucesso <p>',
        icon: 'success',
        iconColor: '#3064B4',
        showConfirmButton: false,
        width: '25rem',
        heightAuto: false
    })

}

searchBar.addEventListener('keyup', (e) => {

    const search = e.target.value.toLowerCase()
    const filteredMoviesDirectors = movieDirectorARRAY.filter((movieDirector) => {
        return (
            movieDirector.filme.toLowerCase().includes(search) ||
            movieDirector.diretor.toLowerCase().includes(search) 
        )
    })
    setMovieDirectors(filteredMoviesDirectors)

})

buttonCreateMovieDirector.addEventListener('click', addPostMovieDirectorContainer)
buttonClosePostMovieDirectorContainer.addEventListener('click', closePostMovieDirectorContainer)
buttonCloseEditMovieDirectorContainer.addEventListener('click', closeEditMovieDirectorContainer)
buttonRegisterMovieDirector.addEventListener('click', postMovieDirectorFun)
buttonDeleteMovieDirector.addEventListener('click', deleteMovieDirectorFun)
buttonSaveEditMovieDirector.addEventListener('click', updateMovieDirectorFun)

window.addEventListener('load', async () => {

    const movieDirectors = await getDirectorsMovies()    
    movieDirectorARRAY = movieDirectors.filmes_diretores
    setMovieDirectors(movieDirectors.filmes_diretores)

    const moviesJSON = await getMovies()
    setMovies(moviesJSON.filmes)

    const directorsJSON = await getDirectors()
    setDirectors(directorsJSON.diretores)

    closeLoading()

})
