'use strict'

import { createMoviesCard } from './movie-card.js'
import { getMovies, getMoviesByName } from './functions.js'
import { closeLoading } from './loading.js'

const main = document.getElementById('main')
const searchBar = document.getElementById('search')

let size = {

    h: 'h-[calc(((100vw-7rem-1.5rem*6)/7)*45/30)]',
    w: 'w-[calc((100vw-7rem-1.5rem*6)/7)]'

}

const createMovies = (moviesArray, cardSize) => {
    
    main.replaceChildren('')

    moviesArray.forEach(movie => {
        const movieCard = createMoviesCard(movie, cardSize)
        movieCard.classList.add('max-md:h-[calc(((100vw-3.5rem-1.5rem)/2)*45/30)]')
        movieCard.classList.add('max-md:w-[calc((100vw-3.5rem-1.5rem)/2)]')
        main.appendChild(movieCard)
    })

}

const setAllMovies = async() => {
    const moviesJSON = await getMovies() 
    createMovies(moviesJSON.filmes, size)
    closeLoading()
}

searchBar.addEventListener('keyup', async() => {

    const search = searchBar.value.toLowerCase()

    if(search != ''){
        const filteredMovies = await getMoviesByName(search) 
        if(filteredMovies.status_code == 200){
            createMovies(filteredMovies.filmes, size)
        }
    }else{
        setAllMovies()
    }

})

window.addEventListener('load', setAllMovies)