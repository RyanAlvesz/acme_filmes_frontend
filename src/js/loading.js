'use strict'

const loadingCard = document.getElementById('loading')

export const closeLoading = () => {
    setTimeout(() => {
        loadingCard.classList.add('hidden')
    }, 700)
}