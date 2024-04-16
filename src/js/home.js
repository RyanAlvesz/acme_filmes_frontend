'use strict'

// Montagem de itens

import { getMoviesByGenre, getFavoriteMovies } from "./functions.js"
import { createMoviesCard } from "./movie-card.js"

const colorThief = new ColorThief()

const scrollHome = document.getElementById('scroll-home')
const closeMenu = document.getElementById('close-menu')
const openMenu = document.getElementById('open-menu')
const menu = document.getElementById('menu')

const featuredMovie = {
    cover: '../images/background.png',
    title: 'Kill Bill Volume 1',
    year: '2003',
    director: 'Quentin Tarantino',
    poster: 'https://br.web.img2.acsta.net/pictures/23/04/05/09/34/1483846.jpg'
}

const setFeaturedMovie = async(featuredMovie) => {
    
    // featured movie infos
    const FMcover = document.getElementById('featured-movie-bagckround')
    const FMtitle = document.getElementById('featured-movie-title')
    const FMyear = document.getElementById('featured-movie-year')
    const FMdirector = document.getElementById('featured-movie-director')
    const FMcardMobile = document.getElementById('featured-movie-mobile')
    const FMcardMobileImg = document.getElementById('featured-movie-mobile-img')

    FMcover.style.backgroundImage = `url('${featuredMovie.cover}')`
    FMtitle.textContent = featuredMovie.title
    FMyear.textContent = featuredMovie.year
    FMdirector.textContent = featuredMovie.director
    FMcardMobile.style.backgroundImage = `url('${featuredMovie.poster}')`
    // FMcardMobileImg.src = '../images/background.png'
    FMcardMobileImg.src = featuredMovie.poster

    

}

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
    h2.textContent = genre.genero.toUpperCase()
    
    const moviesContainer = document.createElement('div')
    moviesContainer.classList.add('h-[calc(36vh-1rem-2rem+1rem)]', 'flex', 'items-end', 'gap-6', 'w-[calc(100vw-7rem)]', 'overflow-x-auto', 'place-self-center', '-translate-y-[0.75rem]')
    
    genre.filmes.forEach(movie => {
        
        const card = createMoviesCard(movie, cardSize)
        moviesContainer.appendChild(card)

    });

    // Rolagem lateral

    moviesContainer.addEventListener('wheel', (e) => {
        moviesContainer.style.scrollBehavior = 'auto'
    })

    section.replaceChildren(h2, moviesContainer)

    return section

}

const addMovies = (moviesJSON) => {

    const main = document.getElementById('main')

    moviesJSON.forEach(genre => {

        let movieSection = createMoviesSection(genre)
        main.appendChild(movieSection)

    })

}

openMenu.addEventListener('click', () => {
    menu.classList.remove('translate-y-full')
})

closeMenu.addEventListener('click', () => {
    menu.classList.add('translate-y-full')
})

window.addEventListener('load', async() => {
    
    const moviesByGenreJSON = await getMoviesByGenre()
    const favoriteMovies = await getFavoriteMovies(1)

    const favoriteMovieArray = [

        {
            genero: "Sua lista",
            filmes: [
                favoriteMovies.filmes[0]
            ]
        }

    ]

    addMovies(favoriteMovieArray)
    addMovies(moviesByGenreJSON.generos)
    setFeaturedMovie(featuredMovie)

})

