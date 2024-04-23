'use strict'

import { getMovies } from './functions.js'

const moviesContainer = document.getElementById('movies-container')
const buttonCreateMovie = document.getElementById('create-movie')

const createMovieCard = (movie) => {

    const card = document.createElement('div')
    card.classList.add('bg-dark_gray', 'h-fit', 'w-[calc((80vw-3.5rem-1rem)/3)]', 'overflow-hidden', 'rounded-md', 'p-3', 'gap-3', 'grid', 'grid-cols-[auto_1fr]', 'ease-linear', 'duration-200', 'hover:scale-[1.01]', 'cursor-pointer')

    const moviePoster = document.createElement('img')
    moviePoster.classList.add('w-[calc(((80vw-3.5rem-1rem)/3-1.5rem)/3)]', 'h-[calc((((80vw-3.5rem-1rem)/3-1.5rem)/3)*45/30)]', 'object-cover', 'rounded-md')
    moviePoster.src = movie.foto_capa
    moviePoster.alt = movie.nome

    const div = document.createElement('div')
    div.classList.add('flex', 'flex-col', 'text-white', 'items-center', 'justify-center', 'gap-1')

    const movieTitle = document.createElement('h2')
    movieTitle.classList.add('font-semibold', 'text-2xl', 'drop-shadow-[-1px_1px_0px_#ff0000]')
    movieTitle.textContent = movie.nome

    const movieRelease = document.createElement('span')
    movieRelease.classList.add('font-semibold', 'text-lg')

    const DateTime = luxon.DateTime
    let dt = DateTime.fromISO(movie.data_lancamento)
    movieRelease.textContent = dt.toLocaleString(DateTime.DATE_SHORT)

    card.replaceChildren(moviePoster, div)
    div.replaceChildren(movieTitle, movieRelease)

    return card

}

const setMovies = async() => {
    const moviesJSON = await getMovies() 
    moviesJSON.filmes.forEach((movie) => {
        const movieCard = createMovieCard(movie)
        moviesContainer.appendChild(movieCard)
    })
}

const addPostMovieContainer = () => {
    
}

buttonCreateMovie.addEventListener('click', addPostMovieContainer)

window.addEventListener('load', () => {
    setMovies()
})
