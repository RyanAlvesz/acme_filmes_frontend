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
        main.appendChild(createMoviesCard(movie, cardSize))
    })

}

window.addEventListener('load', async() => {
    const moviesJSON = await getMovies() 
    createMovies(moviesJSON.filmes, size)
})