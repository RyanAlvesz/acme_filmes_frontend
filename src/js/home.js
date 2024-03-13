'use strict'

const searchInput = document.getElementById('search')
const searchButton = document.getElementById('search-button')
const searchContainer = document.getElementById('search-container')
const moviesContainer = document.getElementById('movies-container')
const moviesSection = document.getElementById('movies-section')

// Pesquisa

const closeSearchContainer = () => {
    searchContainer.classList.remove('bg-medium_gray/70')
    searchInput.classList.add('hidden')
}

searchButton.addEventListener('mouseover', () => {

    searchContainer.classList.add('bg-medium_gray/70')
    searchInput.classList.remove('hidden')

})

searchContainer.addEventListener('mouseleave', () => {
    if(searchInput == document.activeElement == false){
        closeSearchContainer()
    }
})

searchInput.addEventListener('focusout', () => {
    closeSearchContainer()
})


// Rolagem filmes

let scrollNext = 350

moviesSection.children['next'].addEventListener('click', () => {
    moviesContainer.scroll({
        top: 0,
        left: scrollNext,
        behavior: 'smooth'
    })
    scrollNext += 350
})

let scrollPrev = -350

moviesSection.children['prev'].addEventListener('click', () => {
    moviesContainer.scroll({
        top: 0,
        left: scrollPrev,
        behavior: 'smooth'
    })
    scrollPrev += -350
})
