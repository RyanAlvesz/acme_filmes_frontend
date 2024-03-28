'use strict'

// import { getFilmes, getFilmeById, postFilme } from "./filmes.js"

const inputPasswordLogin = document.getElementById('password-login')
const inputPasswordRegister = document.getElementById('password-register')
const hoverWhiteIcon = document.getElementsByClassName('hover-white-icon')
const buttonChangeOverlayRegister = document.getElementById('button-change-overlay-register')
const buttonChangeOverlayLogin = document.getElementById('button-change-overlay-login')
const containerOverlay = document.getElementById('container-overlay')
const formContainer = document.getElementById('form-container')
const buttonLogin = document.getElementById('login')
const buttonRegister = document.getElementById('register')

const signIn = () => {
    window.location.href = './src/pages/whos-whatching.html'
}

const changeInputPasswordVisibilty = (e) => {
    
    if(!e.target.src.includes('open')){
        e.target.src = './src/images/svg/clapperboard-open.svg'
        e.target.parentNode.previousElementSibling.type = 'text'
    }else{
        e.target.src = './src/images/svg/clapperboard.svg'
        e.target.parentNode.previousElementSibling.type = 'password'
    }

}

const moveOverlay = () => {

    containerOverlay.classList.toggle('translate-x-full')
    containerOverlay.classList.toggle('[&>*:nth-child(2)]:opacity-0')

    formContainer.children[0].classList.toggle('translate-x-full')
    formContainer.children[0].classList.toggle('-z-10')
    formContainer.children[0].classList.toggle('z-10')
    formContainer.children[0].classList.toggle('opacity-0')

    formContainer.children[1].classList.toggle('-translate-x-full')
    formContainer.children[1].classList.toggle('-z-10')
    formContainer.children[1].classList.toggle('z-10')
    formContainer.children[1].classList.toggle('opacity-0')

}

for (let icons of hoverWhiteIcon) {

    icons.parentNode.addEventListener('mouseover', () => {
        
        setTimeout(() => {

        let iconSrc = icons.src

            if(!iconSrc.includes('hover')){
                let stringWhitoutSvg = iconSrc.split('.svg')
                let src = stringWhitoutSvg[0] + '-hover.svg'
                icons.src = src
            }

        }, 0.15 * 1000)

        
    })

    icons.parentNode.addEventListener('mouseleave', () => {

        setTimeout(() => {

            let iconSrc = icons.src
            
            if (iconSrc.includes('hover')){
                let src = iconSrc.split('-hover.svg')[0] + '.svg'
                icons.src = src    
            }

        }, 0.25 * 1000)

    })

}

inputPasswordLogin.nextElementSibling.addEventListener('click', changeInputPasswordVisibilty)
inputPasswordRegister.nextElementSibling.addEventListener('click', changeInputPasswordVisibilty)
buttonChangeOverlayRegister.addEventListener('click', moveOverlay)
buttonChangeOverlayLogin.addEventListener('click', moveOverlay)
buttonLogin.addEventListener('click', signIn)
buttonRegister.addEventListener('click', signIn)