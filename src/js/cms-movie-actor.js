'use strict'

import { getActorsMovies, postActorMovie, updateActorMovie, deleteActorMovie, getActors, getMovies } from './functions.js'
import { closeLoading } from './loading.js'

const movieActorsSection = document.getElementById('movie-actors-section')
const buttonCreateMovieActor = document.getElementById('create-movie-actor')
const postMovieActorContainer = document.getElementById('post-movie-actor-container')
const buttonClosePostMovieActorContainer = document.getElementById('close-post-movie-actor')
const editMovieActorContainer = document.getElementById('edit-movie-actor-container')
const buttonCloseEditMovieActorContainer = document.getElementById('close-edit-movie-actor')
const searchBar = document.getElementById('search')

// Post input
const movieInput = document.getElementById('movie')
const actorInput = document.getElementById('actor')
const buttonRegisterMovieActor = document.getElementById('button-register-movie-actor')

// Edit Input
const editMovieInput = document.getElementById('edit-movie')
const editActorInput = document.getElementById('edit-actor')
const buttonSaveEditMovieActor = document.getElementById('button-edit-movie-actor')
const buttonDeleteMovieActor = document.getElementById('button-delete-movie-actor')

let movieActorARRAY

const createMovieActorCard = (movieActor) => {

    const card = document.createElement('div')
    card.classList.add('bg-dark_gray', 'w-[calc((80vw-3.5rem-(1rem*3))/4)]', 'overflow-hidden', 'rounded-md', 'p-3', 'py-5', 'flex', 'flex-col', 'gap-2', 'items-center', 'justify-center', 'ease-linear', 'duration-200', 'hover:scale-[1.01]', 'cursor-pointer')
    
    card.addEventListener('click', () => {
        setEditMovieActor(movieActor)
        localStorage.setItem('editMovieActorId', movieActor.id)
        editMovieActorContainer.classList.remove('hidden')
        editMovieActorContainer.classList.add('fixed')
    })

    const movieName = document.createElement('h2')
    movieName.classList.add('text-white','font-semibold', 'text-xl', 'drop-shadow-[-1px_1px_0px_#ff0000]','text-center')
    movieName.textContent = movieActor.filme

    const actorName = document.createElement('h2')
    actorName.classList.add('text-white','font-semibold', 'text-base', 'drop-shadow-[-1px_1px_0px_#3064B4]','text-center')
    actorName.textContent = movieActor.ator

    card.replaceChildren(movieName, actorName)

    return card

}

const setMovieActors = (movieActors) => {

    movieActorsSection.replaceChildren('')
    movieActors.forEach((movieActor) => {
        const movieActorCard = createMovieActorCard(movieActor)
        movieActorsSection.appendChild(movieActorCard)
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

const setActors = (actors) => {

    actors.forEach((actor) => {
        const option = createOptions(actor)
        actorInput.appendChild(option)
    })

}

const addPostMovieActorContainer = () => {
    postMovieActorContainer.classList.add('fixed')
    postMovieActorContainer.classList.remove('hidden')
}

const closePostMovieActorContainer = () => {
    postMovieActorContainer.classList.remove('fixed')
    postMovieActorContainer.classList.add('hidden')
}

const closeEditMovieActorContainer = () => {
    editMovieActorContainer.classList.add('hidden')
    editMovieActorContainer.classList.remove('fixed')
}

const postMovieActorFun = async() => {

    if(postInputValidation()){
        
        Swal.fire({
            position: 'center',
            title: '<p class="text-2xl text-dark_gray"> Cadastrando ator no filme... <p>',
            imageUrl: "../../images/logo.png",
            imageWidth: '60%',
            imageAlt: "Logo acme",
            showConfirmButton: false,
            padding: '0 0 28px 0',
            width: '30rem',
            heightAuto: false
        })
    
        const movieActor = {
            id_filme: movieInput.value,
            id_ator: actorInput.value
        }
        
        const rsPost = await postActorMovie(movieActor)
        const movieActors = await getActorsMovies()    
        movieActorARRAY = movieActors.filmes_atores
        setMovieActors(movieActors.filmes_atores)

        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-dark_gray"> Ator cadastrado no filme com sucesso! <p>',
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
        actorInput.value == '' 
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

const setEditMovieActor = (movieActor) => {

    setEditMovies(movieActor.id_filme)
    setEditActors(movieActor.id_ator)

}

const deleteMovieActorFun = () => {

    const swalWithBootstrapButtons = Swal.mixin({

        customClass: {
            confirmButton: 'bg-secundary rounded-lg px-6 h-10 w-44 text-lg text-white max-md:text-base max-md:w-32',
            cancelButton: 'bg-main rounded-lg px-6 h-10 w-44 text-lg text-white mr-6 max-md:text-base max-md:w-32'
        },
        buttonsStyling: false,
        heightAuto: false

    })

    swalWithBootstrapButtons.fire({

        title: '<p class="text-2xl text-secundary font-poppins"> Tem certeza que deseja excluir esse ator desse filme? </p>',
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

            const rsDelete = await deleteActorMovie(localStorage.getItem('editMovieActorId'))
            const movieActors = await getActorsMovies()    
            movieActorARRAY = movieActors.filmes_atores
            setMovieActors(movieActors.filmes_atores)
            closeEditMovieActorContainer()

        }

    }) 

}

const updateMovieActorFun = async() => {

    let movieActor = {
        id_filme: editMovieInput.value,
        id_ator: editActorInput.value
    }

    const rsUpdate = await updateActorMovie(movieActor, localStorage.getItem('editMovieActorId'))

    const movieActors = await getActorsMovies()    
    movieActorARRAY = movieActors.filmes_atores
    setMovieActors(movieActors.filmes_atores)

    Swal.fire({
        position: 'center',
        timer: 2000,
        title: '<p class="text-2xl text-dark_gray"> Ator do filme atualizado com sucesso <p>',
        icon: 'success',
        iconColor: '#3064B4',
        showConfirmButton: false,
        width: '25rem',
        heightAuto: false
    })

}

searchBar.addEventListener('keyup', (e) => {

    const search = e.target.value.toLowerCase()
    const filteredActorsMovies = movieActorARRAY.filter((movieActor) => {
        return (
            movieActor.filme.toLowerCase().includes(search) ||
            movieActor.ator.toLowerCase().includes(search) 
        )
    })
    setMovieActors(filteredActorsMovies)

})

buttonCreateMovieActor.addEventListener('click', addPostMovieActorContainer)
buttonClosePostMovieActorContainer.addEventListener('click', closePostMovieActorContainer)
buttonCloseEditMovieActorContainer.addEventListener('click', closeEditMovieActorContainer)
buttonRegisterMovieActor.addEventListener('click', postMovieActorFun)
buttonDeleteMovieActor.addEventListener('click', deleteMovieActorFun)
buttonSaveEditMovieActor.addEventListener('click', updateMovieActorFun)

window.addEventListener('load', async () => {

    const movieActors = await getActorsMovies()    
    movieActorARRAY = movieActors.filmes_atores
    setMovieActors(movieActors.filmes_atores)

    const moviesJSON = await getMovies()
    setMovies(moviesJSON.filmes)

    const actorsJSON = await getActors()
    setActors(actorsJSON.atores)

    closeLoading()

})
