'use strict'

import { postValidationEmployee, postValidationUser, getEmployees, getUsers, postUser } from './functions.js'

// OBJETOS DE ESTRUTURA DO HTML
const inputEmaildLogin = document.getElementById('email-login')
const inputPasswordLogin = document.getElementById('password-login')
const inputNameRegister = document.getElementById('name-register')
const inputEmailRegister = document.getElementById('email-register')
const inputPasswordRegister = document.getElementById('password-register')
const hoverWhiteIcon = document.getElementsByClassName('hover-white-icon')
const buttonChangeOverlayRegister = document.getElementById('button-change-overlay-register')
const buttonChangeOverlayRegisterMobile = document.getElementById('mobile-button-register')
const buttonChangeOverlayLogin = document.getElementById('button-change-overlay-login')
const buttonChangeOverlayLoginMobile = document.getElementById('mobile-button-login')
const containerOverlay = document.getElementById('container-overlay')
const formContainer = document.getElementById('form-container')
const buttonLogin = document.getElementById('login')
const buttonRegister = document.getElementById('register')

const login = async() => {

    const email = inputEmaildLogin.value
    const password = inputPasswordLogin.value

    if (email == '' || !email.includes('@') || password == ''){

        Swal.fire({
            position: 'top',
            timer: 2000,
            title: '<p class="text-2xl text-secundary"> Preencha todas as informações corretamente <p>',
            icon: 'warning',
            iconColor: '#FD3131',
            showConfirmButton: false,
            width: '25rem',
            heightAuto: false,
        })   

    } else {

        let login = {
            email: email,
            senha: password
        }

        let valLoginUser, valLoginEmployee
        let userValidation = await postValidationUser(login)
        let employeeValidation = await postValidationEmployee(login)

        if(userValidation.status){
            localStorage.setItem('userId', userValidation.usuario[0].id)
            window.location.href = './src/pages/whos-whatching.html'
        } else {
            valLoginUser = true
        }
                
        if(employeeValidation.status){
            localStorage.setItem('employeeId', employeeValidation.funcionario[0].id)
            window.location.href = './src/pages/cms.html'
        } else {
            valLoginEmployee = true
        }

        if(valLoginEmployee && valLoginUser){

            Swal.fire({
                position: 'top',
                timer: 2000,
                title: '<p class="text-2xl text-secundary"> Email ou senha incorretos <p>',
                icon: 'warning',
                iconColor: '#FD3131',
                showConfirmButton: false,
                width: '25rem',
                heightAuto: false,
                padding: '0 0 1.5rem 0'    
            }) 

        }

    }

}

const register = async() => {

    const name = inputNameRegister.value
    const email = inputEmailRegister.value
    const password = inputPasswordRegister.value

    if (name == '' || email == '' || !email.includes('@') || password == ''){

        Swal.fire({
            position: 'top',
            timer: 2000,
            title: '<p class="text-2xl text-secundary"> Preencha todas as informações corretamente <p>',
            icon: 'warning',
            iconColor: '#FD3131',
            showConfirmButton: false,
            width: '25rem',
            heightAuto: false,
        })   

    } else {

        const users = await getUsers()
        const employees = await getEmployees()
        let valLoginUser, valLoginEmployee

        users.usuarios.forEach(user => {
            if(email == user.email){ 
                Swal.fire({
                    position: 'top',
                    timer: 2000,
                    title: '<p class="text-2xl text-secundary"> Email já cadastrado <p>',
                    icon: 'warning',
                    iconColor: '#FD3131',
                    showConfirmButton: false,
                    width: '25rem',
                    heightAuto: false,
                })      
                valLoginUser = true
            }           
        })

        employees.funcionarios.forEach(employee => {
            if(email == employee.email){              
                Swal.fire({
                    position: 'top',
                    timer: 2000,
                    title: '<p class="text-2xl text-secundary"> Email já cadastrado <p>',
                    icon: 'warning',
                    iconColor: '#FD3131',
                    showConfirmButton: false,
                    width: '25rem',
                    heightAuto: false,
                })
                valLoginEmployee = true
            }    
        })

        if(!valLoginEmployee && !valLoginUser){

            const newUser = {
                'nome': name,
                'email': email,
                'senha': password
            }

            let user = await postUser(newUser)
            localStorage.setItem('userId', user.usuario.id)
            window.location.href = './src/pages/whos-whatching.html'
            
        }

    }

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
    formContainer.children[0].classList.toggle('max-lg:-translate-x-full')
    formContainer.children[0].classList.toggle('-z-10')
    formContainer.children[0].classList.toggle('z-10')
    formContainer.children[0].classList.toggle('opacity-0')

    formContainer.children[1].classList.toggle('-translate-x-full')
    formContainer.children[1].classList.toggle('max-lg:translate-x-0')
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
buttonChangeOverlayRegisterMobile.addEventListener('click', moveOverlay)
buttonChangeOverlayLogin.addEventListener('click', moveOverlay)
buttonChangeOverlayLoginMobile.addEventListener('click', moveOverlay)
buttonLogin.addEventListener('click', login)
buttonRegister.addEventListener('click', register)