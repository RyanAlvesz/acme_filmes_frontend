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

/* <form id="search-container" class="flex overflow-hidden py-1 px-2 gap-2 rounded-md">
    <input type="text" name="search" id="search" class="hidden w-[20vw] bg-transparent hover:outline-none text-white focus:outline-none  cursor-pointer" autocomplete="off">
    <label id="search-button" for="search" class="h-[4vh] w-[4vh] cursor-pointer">
        <img src="../images/svg/search.svg" alt="" class="h-full">
    </label>
</form> */