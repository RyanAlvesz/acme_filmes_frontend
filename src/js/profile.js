'use strict'

const buttonChooseIcon = document.getElementById('button-choose-icon')
const buttonCloseChooseIcon = document.getElementById('button-close-choose-icon')
const containerChooseIcon = document.getElementById('container-choose-icon')
const saveButton = document.getElementById('save')
const deleteButton = document.getElementById('delete')
const exitButton = document.getElementById('exit')

saveButton.addEventListener('click', () =>{
    window.history.back()
})

deleteButton.addEventListener('click', () =>{
    window.location.href = './whos-whatching.html'
})

exitButton.addEventListener('click', () =>{
    window.location.href = '../../index.html'
})

buttonChooseIcon.addEventListener('click', () => {

    containerChooseIcon.classList.remove('hidden')
    containerChooseIcon.classList.add('flex')
    
})

buttonCloseChooseIcon.addEventListener('click', () => {

    containerChooseIcon.classList.remove('flex')
    containerChooseIcon.classList.add('hidden')

})