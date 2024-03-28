'use strict'

const searchInput = document.getElementById('search')
const searchButton = document.getElementById('search-button')
const searchContainer = document.getElementById('search-container')

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