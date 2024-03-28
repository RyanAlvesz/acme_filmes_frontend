'use strict'

import { allMoviesJSON } from "./movies-json.js"
import { createMoviesCard } from "./movie-card.js"

const main = document.getElementById('main')

let size = {

    h: 'h-[calc(((100vw-7rem-1.5rem*6)/7)*45/30)]',
    w: 'w-[calc((100vw-7rem-1.5rem*6)/7)]'

}

const createMovies = (moviesArray, cardSize) => {
    
    moviesArray.forEach(movie => {
        main.appendChild(createMoviesCard(movie, cardSize, false))
    })

}

createMovies(allMoviesJSON.filmes, size)