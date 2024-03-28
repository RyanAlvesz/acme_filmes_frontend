'use strict'

// Montagem de itens

import { moviesJSON } from "./movies-json.js"
import { createMoviesCard } from "./movie-card.js"

const scrollHome = document.getElementById('scroll-home')

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

    const arrowPrev = document.createElement('button')
    arrowPrev.classList.add('flex', 'h-[15vh]', 'w-10', '-top-[calc(5vh-50%)]', '-translate-x-full', 'absolute', 'left-0', 'items-center', 'justify-center', 'opacity-0', 'ease-linear', 'duration-200')
    
    const arrowImgPrev = document.createElement('img')
    arrowImgPrev.classList.add('h-full', 'w-full')
    arrowImgPrev.src = '../images/svg/arrow-prev.svg'
    arrowImgPrev.alt = 'Seta para esquerda'

    arrowPrev.appendChild(arrowImgPrev)
    
    const arrowNext = document.createElement('button')
    arrowNext.classList.add('flex', 'h-[15vh]', 'w-10', 'right-0', '-top-[calc(5vh-50%)]', 'translate-x-full', 'absolute', 'items-center', 'justify-center', 'opacity-0', 'ease-linear', 'duration-200')
    
    const arrowImgNext = document.createElement('img')
    arrowImgNext.classList.add('h-full', 'w-full')
    arrowImgNext.src = '../images/svg/arrow-next.svg'
    arrowImgNext.alt = 'Seta para direita'

    arrowNext.appendChild(arrowImgNext)
    
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

    arrowNext.addEventListener('click', () => {
        moviesContainer.style.scrollBehavior = 'smooth'
        moviesContainer.scrollLeft += 900
    })
    
    arrowPrev.addEventListener('click', () => {
        moviesContainer.style.scrollBehavior = 'smooth'
        moviesContainer.scrollLeft -= 900
    })

    section.addEventListener('mouseover', () => {

        arrowNext.classList.remove('opacity-0')
        arrowPrev.classList.remove('opacity-0')

    })

    section.addEventListener('mouseout', () => {

        arrowNext.classList.add('opacity-0')
        arrowPrev.classList.add ('opacity-0')

    })

    section.replaceChildren(h2, arrowPrev, moviesContainer, arrowNext)

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

