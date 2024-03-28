'use strict'

import { createMoviesCard } from "./movie-card.js";
import { allMoviesJSON } from "./movies-json.js"

const actorMoviesContainer = document.getElementById('actor-movies-container')

let size = {

    h: 'h-[20vh]',
    w: 'w-[calc(20vh*30/45)]'

}

const createMovies = (moviesArray, cardSize) => {
    
    moviesArray.forEach(movie => {
        actorMoviesContainer.appendChild(createMoviesCard(movie, cardSize, false))
    })

}

actorMoviesContainer.addEventListener('wheel', (e) => {

    e.preventDefault()
    actorMoviesContainer.scrollLeft += e.deltaY
    actorMoviesContainer.scrollLeft += e.deltaX
    actorMoviesContainer.style.scrollBehavior = 'auto'

})

createMovies(allMoviesJSON.filmes, size)
