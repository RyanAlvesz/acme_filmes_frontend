'use strict'

import { postValidationEmployee, postValidationUser, getEmployees, getUsers, postUser } from './functions.js'

const staySigned = localStorage.getItem('staySigned')

// OBJETOS DE ESTRUTURA DO HTML
const inputEmailLogin = document.getElementById('email-login')
const inputPasswordLogin = document.getElementById('password-login')
const inputNameRegister = document.getElementById('name-register')
const inputEmailRegister = document.getElementById('email-register')
const inputPasswordRegister = document.getElementById('password-register')
const buttonChangeOverlayRegister = document.getElementById('button-change-overlay-register')
const buttonChangeOverlayRegisterMobile = document.getElementById('mobile-button-register')
const buttonChangeOverlayLogin = document.getElementById('button-change-overlay-login')
const buttonChangeOverlayLoginMobile = document.getElementById('mobile-button-login')
const containerOverlay = document.getElementById('container-overlay')
const formContainer = document.getElementById('form-container')
const buttonLogin = document.getElementById('login')
const buttonRegister = document.getElementById('register')
const staySignedLogin = document.getElementById('stay-signed-login')
const staySignedRegister = document.getElementById('stay-signed-register')

// Alerta de informações incorretas
const fillAllTheInfoMessage = () => {

    Swal.fire({
        position: 'top',
        timer: 2000,
        title: '<p class="text-2xl text-secundary"> Preencha todas as informações corretamente <p>',
        icon: 'warning',
        iconColor: '#FD3131',
        showConfirmButton: false,
        width: '25rem',
        heightAuto: false
    })  

}

// Função para Login
const login = async() => {

    const email = inputEmailLogin.value
    const password = inputPasswordLogin.value

    if (email == '' || !email.includes('@') || password == ''){

        fillAllTheInfoMessage()  

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
            if(staySignedLogin.checked){
                localStorage.setItem('staySigned', 'true')
            }
            window.location.href = './src/pages/whos-whatching.html'
        } else {
            valLoginUser = true
        }
                
        if(employeeValidation.status){
            localStorage.setItem('employeeId', employeeValidation.funcionario[0].id)
            window.location.href = './src/pages/cms/movie-cms.html'
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

// Função para cadastro
const register = async() => {

    const name = inputNameRegister.value
    const email = inputEmailRegister.value
    const password = inputPasswordRegister.value

    if (name == '' || email == '' || !email.includes('@') || password == ''){

         fillAllTheInfoMessage()

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
            if(staySignedRegister.checked){
                localStorage.setItem('staySigned', 'true')
            }
            window.location.href = './src/pages/whos-whatching.html'
            
        }

    }

}

// Função para trocar a mostrar ou ocultar a senha (trocando o tipo do input de password para text)
const changeInputPasswordVisibilty = (e) => {
    
    if(!e.target.src.includes('open')){
        e.target.src = './src/images/svg/clapperboard-open.svg'
        e.target.parentNode.previousElementSibling.type = 'text'
    }else{
        e.target.src = './src/images/svg/clapperboard.svg'
        e.target.parentNode.previousElementSibling.type = 'password'
    }

}

// Função para trocar a alternar a tela entre login e cadastro
const moveOverlay = () => {

    containerOverlay.classList.toggle('translate-x-full')
    containerOverlay.classList.toggle('[&>*:nth-child(2)]:opacity-0')

    formContainer.children[0].classList.toggle('translate-x-full')
    formContainer.children[0].classList.toggle('max-lg:-translate-x-full')
    formContainer.children[0].classList.toggle('-z-10')
    formContainer.children[0].classList.toggle('z-10')
    formContainer.children[0].classList.toggle('opacity-0')

    formContainer.children[1].classList.toggle('-translate-x-full')
    formContainer.children[1].classList.toggle('max-lg:translate-x-full')
    formContainer.children[1].classList.toggle('-z-10')
    formContainer.children[1].classList.toggle('z-10')
    formContainer.children[1].classList.toggle('opacity-0')

}

// Alterar visibilidade da senha
inputPasswordLogin.nextElementSibling.addEventListener('click', changeInputPasswordVisibilty)
inputPasswordRegister.nextElementSibling.addEventListener('click', changeInputPasswordVisibilty)

// Animação de troca de tela de Login e Cadastro
buttonChangeOverlayRegister.addEventListener('click', moveOverlay)
buttonChangeOverlayRegisterMobile.addEventListener('click', moveOverlay)
buttonChangeOverlayLogin.addEventListener('click', moveOverlay)
buttonChangeOverlayLoginMobile.addEventListener('click', moveOverlay)

// Ao clickar no botão, tentar fazer o login ou se cadastrar
buttonLogin.addEventListener('click', login)
buttonRegister.addEventListener('click', register)

// Ao precisonar ENTER, tentar fazer o login ou se cadastrar
inputEmailLogin.addEventListener('keypress', (event) => { if (event.key === 'Enter') { login() }})
inputPasswordLogin.addEventListener('keypress', (event) => { if (event.key === 'Enter') { login() }})
inputNameRegister.addEventListener('keypress', (event) => { if (event.key === 'Enter') { register() }})
inputEmailRegister.addEventListener('keypress', (event) => { if (event.key === 'Enter') { register() }})
inputPasswordRegister.addEventListener('keypress', (event) => { if (event.key === 'Enter') { register() }})

window.addEventListener('load', () => {

    if(staySigned == 'true'){
        window.location.href = './src/pages/whos-whatching.html'
    }

})