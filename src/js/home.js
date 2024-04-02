'use strict'

// Montagem de itens

import { moviesJSON } from "./movies-json.js"
import { createMoviesCard } from "./movie-card.js"

const scrollHome = document.getElementById('scroll-home')


const featuredMovie = {
    cover: '../images/background.png',
    title: 'Kill Bill Volume 1',
    year: '2003',
    director: 'Quentin Tarantino'
}

const setFeaturedMovie = (featuredMovie) => {
    
    // featured movie infos
    const FMcover = document.getElementById('featured-movie-bagckround')
    const FMtitle = document.getElementById('featured-movie-title')
    const FMyear = document.getElementById('featured-movie-year')
    const FMdirector = document.getElementById('featured-movie-director')

    FMcover.style.backgroundImage = `url('${featuredMovie.cover}')`
    FMtitle.textContent = featuredMovie.title
    FMyear.textContent = featuredMovie.year
    FMdirector.textContent = featuredMovie.director

}

setFeaturedMovie(featuredMovie)

scrollHome.addEventListener('click', () => {

    window.scroll({
        top: 0,
        behavior: 'smooth'
    })

})

let cardSize = {
    h: 'h-[calc(36vh-1rem-2rem)]',
    w: 'w-[calc((36vh-1rem-2rem)*300/450)]'
}

const createMoviesSection = (genre) => {

    const section = document.createElement('section')
    section.classList.add('flex', 'flex-col', 'gap-4', 'pb-4', 'min-h-[40vh]', 'movies-container', 'relative')

    const h2 = document.createElement('h2')
    h2.classList.add('font-semibold', 'text-white', 'text-3xl', 'h-[4vh]')
    h2.textContent = genre.nome.toUpperCase()
    
    const moviesContainer = document.createElement('div')
    moviesContainer.classList.add('h-[calc(36vh-1rem-2rem+1rem)]', 'flex', 'items-end', 'gap-6', 'w-[calc(100vw-7rem)]', 'overflow-x-auto', 'place-self-center', '-translate-y-[0.75rem]')
    
    genre.filmes.forEach(movie => {
        
        const card = createMoviesCard(movie, cardSize, true)
        moviesContainer.appendChild(card)

    });

    // Rolagem lateral

    moviesContainer.addEventListener('wheel', (e) => {

        e.preventDefault()
        moviesContainer.scrollLeft += e.deltaY
        moviesContainer.scrollLeft += e.deltaX
        moviesContainer.style.scrollBehavior = 'auto'

    })

    section.replaceChildren(h2, moviesContainer)

    return section

}

const addMovies = (moviesJSON) => {

    const main = document.getElementById('main')

    moviesJSON.generos.forEach(genre => {

        let movieSection = createMoviesSection(genre)
        main.appendChild(movieSection)

    })

}

window.addEventListener('load', addMovies(moviesJSON))

