'use strict'

const searchInput = document.getElementById('search')
const searchButton = document.getElementById('search-button')
const searchContainer = document.getElementById('search-container')
const moviesContainer = document.getElementById('movies-container')

const closeSearchContainer = () => {
    searchContainer.classList.remove('bg-medium_gray/80')
    searchInput.classList.add('hidden')
}

searchButton.addEventListener('mouseover', () => {

    searchContainer.classList.add('bg-medium_gray/80')
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

window.addEventListener("load", () => {
    console.log(moviesContainer.children['next'])
})

moviesContainer.children['next'].addEventListener('click', () => {
    // moviesContainer.children[1].style.transform = 'translateX(-100%)'
    moviesContainer.scroll({
        top: 0,
        left: 15vh,
        behavior: 'smooth'
    })
})
