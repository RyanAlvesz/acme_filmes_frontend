'use strict'

const searchInput = document.getElementById('search')
const searchButton = document.getElementById('search-button')
const searchContainer = document.getElementById('search-container')

const closeSearchContainer = () => {
    searchContainer.classList.remove('bg-medium_gray')
    searchInput.classList.add('hidden')
}

searchButton.addEventListener('mouseover', () => {

    searchContainer.classList.add('bg-medium_gray')
    searchInput.classList.remove('hidden')

})

searchContainer.addEventListener('mouseleave', () => {
    if(searchInput == document.activeElement == false){
        setTimeout(() => {
            closeSearchContainer()
        }, 250);
    }
})

searchInput.addEventListener('focusout', () => {
    closeSearchContainer()
})