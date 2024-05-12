'use strict'

import { getMoviesGenres, postMovieGenre, updateMovieGenre, deleteMovieGenre, getMovies, getGenres } from './functions.js'
import { closeLoading } from './loading.js'

const movieGenresSection = document.getElementById('movie-genres-section')
const buttonCreateMovieGenre = document.getElementById('create-movie-genre')
const postMovieGenreContainer = document.getElementById('post-movie-genre-container')
const buttonClosePostMovieGenreContainer = document.getElementById('close-post-movie-genre')
const editMovieGenreContainer = document.getElementById('edit-movie-genre-container')
const buttonCloseEditMovieGenreContainer = document.getElementById('close-edit-movie-genre')
const searchBar = document.getElementById('search')

// Post input
const movieInput = document.getElementById('movie')
const genreInput = document.getElementById('genre')
const buttonRegisterMovieGenre = document.getElementById('button-register-movie-genre')

// Edit Input
const editMovieInput = document.getElementById('edit-movie')
const editGenreInput = document.getElementById('edit-genre')
const buttonSaveEditMovieGenre = document.getElementById('button-edit-movie-genre')
const buttonDeleteMovieGenre = document.getElementById('button-delete-movie-genre')

let movieGenreARRAY

const createMovieGenreCard = (movieGenre) => {

    const card = document.createElement('div')
    card.classList.add('bg-dark_gray', 'w-[calc((80vw-3.5rem-(1rem*3))/4)]', 'overflow-hidden', 'rounded-md', 'p-3', 'py-5', 'flex', 'flex-col', 'gap-2', 'items-center', 'justify-center', 'ease-linear', 'duration-200', 'hover:scale-[1.01]', 'cursor-pointer')
    
    card.addEventListener('click', () => {
        setEditMovieGenre(movieGenre)
        localStorage.setItem('editMovieGenreId', movieGenre.id)
        editMovieGenreContainer.classList.remove('hidden')
        editMovieGenreContainer.classList.add('fixed')
    })

    const movieName = document.createElement('h2')
    movieName.classList.add('text-white','font-semibold', 'text-xl', 'drop-shadow-[-1px_1px_0px_#ff0000]','text-center')
    movieName.textContent = movieGenre.filme

    const genreName = document.createElement('h2')
    genreName.classList.add('text-white','font-semibold', 'text-base', 'drop-shadow-[-1px_1px_0px_#3064B4]','text-center')
    genreName.textContent = movieGenre.genero

    card.replaceChildren(movieName, genreName)

    return card

}

const setMovieGenres = (movieGenres) => {

    movieGenresSection.replaceChildren('')
    movieGenres.forEach((movieGenre) => {
        const movieGenreCard = createMovieGenreCard(movieGenre)
        movieGenresSection.appendChild(movieGenreCard)
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

const setGenres = (genres) => {

    genres.forEach((genre) => {
        const option = createOptions(genre)
        genreInput.appendChild(option)
    })

}

const addPostMovieGenreContainer = () => {
    postMovieGenreContainer.classList.add('fixed')
    postMovieGenreContainer.classList.remove('hidden')
}

const closePostMovieGenreContainer = () => {
    postMovieGenreContainer.classList.remove('fixed')
    postMovieGenreContainer.classList.add('hidden')
}

const closeEditMovieGenreContainer = () => {
    editMovieGenreContainer.classList.add('hidden')
    editMovieGenreContainer.classList.remove('fixed')
}

const postMovieGenreFun = async() => {

    if(postInputValidation()){
        
        Swal.fire({
            position: 'center',
            title: '<p class="text-2xl text-dark_gray"> Cadastrando gênero no filme... <p>',
            imageUrl: "../../images/logo.png",
            imageWidth: '60%',
            imageAlt: "Logo acme",
            showConfirmButton: false,
            padding: '0 0 28px 0',
            width: '30rem',
            heightAuto: false
        })
    
        const movieGenre = {
            id_filme: movieInput.value,
            id_genero: genreInput.value
        }
        
        const rsPost = await postMovieGenre(movieGenre)
        const movieGenres = await getMoviesGenres()    
        movieGenreARRAY = movieGenres.filmes_generos
        setMovieGenres(movieGenres.filmes_generos)

        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-dark_gray"> Gênero cadastrado no filme com sucesso! <p>',
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
        genreInput.value == '' 
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

const setEditGenres = async (genreID) => {

    const genresJSON = await getGenres()
    editGenreInput.replaceChildren('')

    genresJSON.generos.forEach((genre) => {
        const option = createOptions(genre)
        if (genre.id == genreID) {
            option.setAttribute('selected', true)
        }
        editGenreInput.appendChild(option)
    })

}

const setEditMovieGenre = (movieGenre) => {

    setEditMovies(movieGenre.id_filme)
    setEditGenres(movieGenre.id_genero)

}

const deleteMovieGenreFun = () => {

    const swalWithBootstrapButtons = Swal.mixin({

        customClass: {
            confirmButton: 'bg-secundary rounded-lg px-6 h-10 w-44 text-lg text-white max-md:text-base max-md:w-32',
            cancelButton: 'bg-main rounded-lg px-6 h-10 w-44 text-lg text-white mr-6 max-md:text-base max-md:w-32'
        },
        buttonsStyling: false,
        heightAuto: false

    })

    swalWithBootstrapButtons.fire({

        title: '<p class="text-2xl text-secundary font-poppins"> Tem certeza que deseja excluir esse gênero desse filme? </p>',
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

            const rsDelete = await deleteMovieGenre(localStorage.getItem('editMovieGenreId'))
            const movieGenres = await getMoviesGenres()    
            movieGenreARRAY = movieGenres.filmes_generos
            setMovieGenres(movieGenres.filmes_generos)
            closeEditMovieGenreContainer()

        }

    }) 

}

const updateMovieGenreFun = async() => {

    let movieGenre = {
        id_filme: editMovieInput.value,
        id_genero: editGenreInput.value
    }

    const rsUpdate = await updateMovieGenre(movieGenre, localStorage.getItem('editMovieGenreId'))

    const movieGenres = await getMoviesGenres()    
    movieGenreARRAY = movieGenres.filmes_generos
    setMovieGenres(movieGenres.filmes_generos)

    Swal.fire({
        position: 'center',
        timer: 2000,
        title: '<p class="text-2xl text-dark_gray"> Gênero do filme atualizado com sucesso <p>',
        icon: 'success',
        iconColor: '#3064B4',
        showConfirmButton: false,
        width: '25rem',
        heightAuto: false
    })

}

searchBar.addEventListener('keyup', (e) => {

    const search = e.target.value.toLowerCase()
    const filteredMoviesGenres = movieGenreARRAY.filter((movieGenre) => {
        return (
            movieGenre.filme.toLowerCase().includes(search) ||
            movieGenre.genero.toLowerCase().includes(search) 
        )
    })
    setMovieGenres(filteredMoviesGenres)

})

buttonCreateMovieGenre.addEventListener('click', addPostMovieGenreContainer)
buttonClosePostMovieGenreContainer.addEventListener('click', closePostMovieGenreContainer)
buttonCloseEditMovieGenreContainer.addEventListener('click', closeEditMovieGenreContainer)
buttonRegisterMovieGenre.addEventListener('click', postMovieGenreFun)
buttonDeleteMovieGenre.addEventListener('click', deleteMovieGenreFun)
buttonSaveEditMovieGenre.addEventListener('click', updateMovieGenreFun)

window.addEventListener('load', async () => {

    const movieGenres = await getMoviesGenres()    
    movieGenreARRAY = movieGenres.filmes_generos
    setMovieGenres(movieGenres.filmes_generos)

    const moviesJSON = await getMovies()
    setMovies(moviesJSON.filmes)

    const genresJSON = await getGenres()
    setGenres(genresJSON.generos)

    closeLoading()

})
