'use strict'

const buttonBack = document.getElementById('back')

buttonBack.addEventListener('click', () => {
    window.history.back()
})