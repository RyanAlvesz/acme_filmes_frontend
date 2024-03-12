'use strict'

const buttonAddProfile = document.getElementById('button-add-profile')
const buttonCloseCreateProfile = document.getElementById('button-close-create-profile')
const buttonChooseIcon = document.getElementById('button-choose-icon')
const buttonCloseChooseIcon = document.getElementById('button-close-choose-icon')
const containerAddProfile = document.getElementById('container-add-profile')
const containerChooseIcon = document.getElementById('container-choose-icon')

const closeContainerCreateProfile = () => {

    containerAddProfile.classList.add('hidden')
    containerAddProfile.classList.remove('flex')

}

const addContainerCreateProfile = () => {

    containerAddProfile.classList.remove('hidden')
    containerAddProfile.classList.add('flex')

}

buttonChooseIcon.addEventListener('click', () => {

    closeContainerCreateProfile()
    containerChooseIcon.classList.remove('hidden')
    containerChooseIcon.classList.add('flex')
    
})

buttonCloseChooseIcon.addEventListener('click', () => {

    containerChooseIcon.classList.remove('flex')
    containerChooseIcon.classList.add('hidden')
    addContainerCreateProfile()

})

buttonCloseCreateProfile.addEventListener('click', closeContainerCreateProfile)
buttonAddProfile.addEventListener('click', addContainerCreateProfile)