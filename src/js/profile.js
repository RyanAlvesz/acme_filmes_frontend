'use strict'

import {getProfileIconsByCategories, getProfileById, getUserById, updateProfile, updateUser, updateUserPassword, deleteUser, getUsers} from './functions.js'

const profileId = localStorage.getItem('profileId')
const userId = localStorage.getItem('userId')

// Icon
const buttonChooseIcon = document.getElementById('button-choose-icon')
const buttonCloseChooseIcon = document.getElementById('button-close-choose-icon')
const containerChooseIcon = document.getElementById('container-choose-icon')

// Info
const nickname = document.getElementById('nickname')
const name = document.getElementById('name')
const email = document.getElementById('email')
const password = document.getElementById('new-password')

// Buttons
const saveButton = document.getElementById('save')
const deleteButton = document.getElementById('delete')
const exitButton = document.getElementById('exit')
const showPassword = document.getElementById('show-password')

const addChooseIcon = () => {

    containerChooseIcon.classList.remove('hidden')
    containerChooseIcon.classList.add('grid')

}

const closeChooseIcon = () => {

    containerChooseIcon.classList.remove('grid')
    containerChooseIcon.classList.add('hidden')

}

const createIconsSection = (categoryJSON) => {

    const divMain = document.createElement('div')
    divMain.classList.add('w-full', 'grid', 'grid-rows-[auto_15vh]', 'gap-2')
    
    const h2 = document.createElement('h2')
    h2.classList.add('text-white', 'text-xl', 'font-semibold', 'px-14', 'max-sm:px-7', 'max-sm:text-base')
    h2.textContent = categoryJSON.categoria

    const divSecundary = document.createElement('div')
    divSecundary.classList.add('grid', 'grid-cols-[auto_1fr_auto]', 'gap-2', 'max-md:grid-cols-1', 'max-md:px-14', 'max-sm:px-7')

    const buttonLeft = document.createElement('button')
    buttonLeft.classList.add('max-md:hidden')
    buttonLeft.addEventListener('click', () => {
        divIcons.scrollLeft -= 150
    })

    const buttonLeftImg = document.createElement('img')
    buttonLeftImg.classList.add('w-12')
    buttonLeftImg.src = '../images/svg/arrow-prev.svg'
    buttonLeftImg.alt = 'Seta para esquerda'

    const buttonRight = document.createElement('button')
    buttonRight.classList.add('max-md:hidden')
    buttonRight.addEventListener('click', () => {
        divIcons.scrollLeft += 150
    })

    const buttonRightImg = document.createElement('img')
    buttonRightImg.classList.add('w-12')
    buttonRightImg.src = '../images/svg/arrow-next.svg'
    buttonRightImg.alt = 'Seta para direita'

    const divIcons = document.createElement('div')
    divIcons.classList.add('flex', 'items-center', 'gap-4', 'w-[calc(100vw-7rem-6rem-1rem)]', 'overflow-x-scroll', 'scroll-smooth', 'overflow-y-hidden', 'max-md:w-[calc(100vw-7rem)]', 'max-sm:w-[calc(100vw-3.5rem)]')

    categoryJSON.fotos.forEach((icon) => {

        const buttonIcon = document.createElement('button')
        buttonIcon.classList.add('h-[15vh]', 'w-[15vh]', 'bg-cover', 'bg-center', 'flex-shrink-0')
        buttonIcon.style.backgroundImage = `url(${icon.foto})`

        buttonIcon.addEventListener('click', () => {

            buttonChooseIcon.id = icon.id
            buttonChooseIcon.style.backgroundImage = `url(${icon.foto})` 
            localStorage.setItem('newProfileIconId', icon.id)
            closeChooseIcon()

        })

        divIcons.appendChild(buttonIcon)

    })

    divMain.replaceChildren(h2, divSecundary)
    divSecundary.replaceChildren(buttonLeft, divIcons, buttonRight)
    buttonLeft.appendChild(buttonLeftImg)
    buttonRight.appendChild(buttonRightImg)

    return divMain

}

const setIconSection = (categoriesARRAY) => {

    const containerIcons = document.getElementById('container-icons')

    categoriesARRAY.forEach((category) => {
        let iconSection = createIconsSection(category)
        containerIcons.append(iconSection)
    })

}

const setUserInfo = async() => {

    const user = await getUserById(userId)
    const profile = await getProfileById(profileId)

    buttonChooseIcon.style.backgroundImage = `url(${profile.perfil[0].foto_perfil})`
    buttonChooseIcon.id = profile.perfil[0].id_foto_perfil
    localStorage.setItem('newProfileIconId', profile.perfil[0].id_foto_perfil)

    nickname.value = profile.perfil[0].apelido
    name.value = user.usuario[0].nome
    email.value = user.usuario[0].email

}

const emailValidation = async() => {

    const user = await getUserById(userId)
    const users = await getUsers()
    let boolean = false

    users.usuarios.forEach((userInfo)=>{
        if(userInfo.email == email.value && userInfo.email != user.usuario[0].email){
            boolean = true
        }
    })
    
    return boolean

}

const updateUserInfo = async() => {

    const emailVal = await emailValidation()

    if(password.value != '' && !emailVal){

        const user = {
            nome: name.value,
            email: email.value,
            senha: password.value
        }

        const rsUpdate = await updateUserPassword(user, userId)
        successMessage()

    } else if (!emailVal) {

        const user = {
            nome: name.value,
            email: email.value
        }
        
        const rsUpdate = await updateUser(user, userId)
        successMessage()

    } else {

        failMessage()

    }

}

const updateProfileInfo = async() => {

    localStorage.setItem('iconId', localStorage.getItem('newProfileIconId'))
    localStorage.setItem('iconURL', buttonChooseIcon.style.backgroundImage.split('"')[1])
    localStorage.setItem('profileNickname', nickname.value)
    
    const profile = {
        apelido: nickname.value,
        id_usuario: userId,
        id_foto_perfil: localStorage.getItem('newProfileIconId')
    }

    const rsUpdate = await updateProfile(profile, profileId)

}

const successMessage = () => {

    Swal.fire({
        timer: 2000,
        title: '<p class="text-2xl text-secundary"> Informações atualizadas com sucesso! <p>',
        icon: 'success',
        iconColor: '#FD3131',
        showConfirmButton: false,
        width: '25rem',
        padding: '0 0 28px 0',
        heightAuto: false,
    })

}

const failMessage = () => {

    Swal.fire({
        timer: 2000,
        title: '<p class="text-2xl text-secundary"> Email já cadastrado! <p>',
        icon: 'error',
        iconColor: '#FD3131',
        showConfirmButton: false,
        width: '25rem',
        padding: '0 0 28px 0',
        heightAuto: false,
    })

}

const updateInfo = () => {

    updateUserInfo()
    updateProfileInfo() 

}

const deleteUserFun = () => {

    const swalWithBootstrapButtons = Swal.mixin({

        customClass: {
          confirmButton: 'bg-secundary rounded-lg px-6 h-10 w-44 text-lg text-white max-md:text-base max-md:w-32',
          cancelButton: 'bg-main rounded-lg px-6 h-10 w-44 text-lg text-white mr-6 max-md:text-base max-md:w-32'
        },
        buttonsStyling: false,
        heightAuto: false
  
      })
  
      if(screen.width > 768){
  
          swalWithBootstrapButtons.fire({
      
            title: '<p class="text-2xl text-secundary font-poppins"> Tem certeza que deseja excluir sua conta? </p>',
            html: '<p class="text-dark_gray"> Essa ação não poderá ser desfeita </p>',
            icon: 'warning',
            iconColor: '#FD3131',
            showCancelButton: true,
            confirmButtonText: 'Excluir',
            cancelButtonText: 'Cancelar',
            width: '40%',
            padding: '0 0 28px 0',
            heightAuto: false,
            reverseButtons: true
      
          }).then( async (result) => {
      
              if (result.isConfirmed) {
      
                  const rsDelete = await deleteUser(userId)
                  leave()

              }
      
          })
  
      } else {
  
          swalWithBootstrapButtons.fire({
      
              title: '<p class="text-2xl text-secundary font-poppins"> Tem certeza que deseja excluir sua conta? </p>',
              html: '<p class="text-dark_gray"> Essa ação não poderá ser desfeita </p>',
              icon: 'warning',
              iconColor: '#FD3131',
              showCancelButton: true,
              confirmButtonText: 'Excluir',
              cancelButtonText: 'Cancelar',
              padding: '0 0 28px 0',
              heightAuto: false,
              reverseButtons: true
        
            }).then( async (result) => {
        
                if (result.isConfirmed) {
        
                    const rsDelete = await deleteUser(userId)
                    leave()
                    
                }
        
            })
  
      }

}

const changePasswordInputVisibility = () => {

    if(showPassword.children[0].src.includes('eye-closed.svg')){
        showPassword.children[0].src = '../images/svg/eye.svg'
        password.type = 'text'
    }else{
        showPassword.children[0].src = '../images/svg/eye-closed.svg'
        password.type = 'password'
    }

}

const leave = () => {
    localStorage.clear()
    window.location.href = '../../index.html'
}

saveButton.addEventListener('click', updateInfo)
deleteButton.addEventListener('click', deleteUserFun)
exitButton.addEventListener('click', leave)
buttonChooseIcon.addEventListener('click', addChooseIcon)
buttonCloseChooseIcon.addEventListener('click', closeChooseIcon)
showPassword.addEventListener('click', changePasswordInputVisibility)

window.addEventListener('load', async() => {
    const icons = await getProfileIconsByCategories()
    setIconSection(icons.fotos_perfil)
    setUserInfo()
})