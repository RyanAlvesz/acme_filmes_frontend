'use strict'

import { createMoviesCard } from './movie-card.js'
import { getMovies } from './functions.js'

const main = document.getElementById('main')

let size = {

    h: 'h-[calc(((100vw-7rem-1.5rem*6)/7)*45/30)]',
    w: 'w-[calc((100vw-7rem-1.5rem*6)/7)]'

}

const createMovies = (moviesArray, cardSize) => {
    
    moviesArray.forEach(movie => {
        const movieCard = createMoviesCard(movie, cardSize)
        movieCard.classList.add('max-md:h-[calc(((100vw-3.5rem-1.5rem)/2)*45/30)]')
        movieCard.classList.add('max-md:w-[calc((100vw-3.5rem-1.5rem)/2)]')
        main.appendChild(movieCard)
    })

}

window.addEventListener('load', async() => {
    const moviesJSON = await getMovies() 
    createMovies(moviesJSON.filmes, size)
})