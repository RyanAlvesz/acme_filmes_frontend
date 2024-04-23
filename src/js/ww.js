'use strict'

import {getProfilesByUser, getProfileById, getProfileIcons, postProfile, updateProfile, getProfileIconsByCategories, deleteProfile } from './functions.js'

const userId = localStorage.getItem('userId')

// Header
const header = document.getElementById('header')

// Post container
const containerAddProfile = document.getElementById('container-add-profile')
const buttonCloseCreateProfile = document.getElementById('button-close-create-profile')
const buttonChooseIcon = document.getElementById('container-add-profile-icon')
const inputNickname = document.getElementById('nickname')
const buttonCreateProfile = document.getElementById('button-create-profile')

// Icons container
const containerChooseIcon = document.getElementById('container-choose-icon')
const buttonCloseChooseIcon = document.getElementById('button-close-choose-icon')

// Profiles container
const containerProfiles = document.getElementById('container-profiles')

// Edit items
const manageProfiles = document.getElementById('manage-profiles')
const manageProfilesImg = document.getElementById('manage-profiles-img')
const manageProfilesText = document.getElementById('manage-profiles-text')
const pageTitle = document.getElementById('page-title')

// Update container
const containerUpdateProfile = document.getElementById('container-update-profile')
const buttonCloseUpdateProfile = document.getElementById('button-close-update-profile')
const containerUpdateProfileIcon = document.getElementById('container-update-profile-icon')
const inputNicknameUpdate = document.getElementById('nickname-update')
const buttonDeleteProfile = document.getElementById('button-delete-profile')
const buttonUpdateProfile = document.getElementById('button-update-profile')



// Create profile

const createProfileCards = (profile) => {

    const button = document.createElement('button')
    button.classList.add('flex', 'flex-col', 'items-center', 'h-fit', 'gap-4', 'relative', 'max-sm:gap-2', '[&>img:nth-child(1)]:hover:drop-shadow-[0px_0px_5px_#994a71]', 'icon')
    button.id = profile.id

    button.addEventListener('click', () => {
        localStorage.setItem('profileId', profile.id)
        localStorage.setItem('profileNickname', profile.apelido)
        localStorage.setItem('iconId', profile.id_foto_perfil)
        localStorage.setItem('iconURL', profile.foto_perfil)
        window.location = localStorage.getItem('homeLogin')
    })

    const img = document.createElement('img')
    img.classList.add('w-32', 'h-32', 'object-cover', 'duration-200', 'max-sm:h-28', 'max-sm:w-28', 'max-md:rounded-md')
    img.src = profile.foto_perfil
    img.alt = profile.nome_foto 
    img.id = profile.id_foto_perfil

    const span = document.createElement('span')
    span.classList.add('text-xl', 'text-white', 'max-sm:text-base')
    span.textContent = profile.apelido

    button.replaceChildren(img, span)

    return button

}

const createAddProfileButton = () => {

    const divMain = document.createElement('div')
    divMain.classList.add('flex', 'flex-col', 'items-center', 'h-fit', 'gap-4', 'cursor-pointer', 'max-sm:gap-2')
    divMain.addEventListener('click', () => {
        addContainerCreateProfile()
        setContainerCreateProfile()
    })

    const divSecundary = document.createElement('div')
    divSecundary.classList.add('flex', 'items-center', 'justify-center', 'w-32', 'h-32', 'max-sm:h-28', 'max-sm:w-28') 

    const button = document.createElement('button')
    button.classList.add('h-4/5', 'w-4/5', 'rounded-full', 'bg-gray', 'flex', 'items-center', 'justify-center', 'p-1')

    const img = document.createElement('img')
    img.src = '../images/svg/plus.svg'
    img.alt = 'Adicionar perfil'

    const span = document.createElement('span')
    span.classList.add('text-xl', 'text-white', 'max-sm:text-base')
    span.textContent = 'Adicionar Perfil'

    divMain.replaceChildren(divSecundary, span)
    divSecundary.appendChild(button)
    button.appendChild(img)

    return divMain

}

const setProfileCards = async() => {

    containerProfiles.replaceChildren('')
    const button = createAddProfileButton()

    const profiles = await getProfilesByUser(userId)
    if(profiles.status_code == 200){
        
        profiles.perfis.forEach(profile => {
            const button = createProfileCards(profile)
            containerProfiles.appendChild(button)
        })
        
        if(profiles.perfis.length < 5){
            containerProfiles.appendChild(button)
        }

    }else{
        containerProfiles.appendChild(button)
    }
    

}

const addContainerCreateProfile = () => {
    
    containerAddProfile.classList.remove('hidden')
    containerAddProfile.classList.add('flex')
    header.classList.remove('z-10')

}

const closeContainerCreateProfile = () => {

    containerAddProfile.classList.add('hidden')
    containerAddProfile.classList.remove('flex')
    header.classList.add('z-10')

}

const setContainerCreateProfile = async() => {

    inputNickname.value = ''
    const icons = await getProfileIcons()
    const randomIconId = Math.floor(Math.random()*(icons.fotos.length)) 
    buttonChooseIcon.style.backgroundImage = `url(${icons.fotos[randomIconId].foto})`
    localStorage.setItem('newProfileIconId', icons.fotos[randomIconId].id)

}

const registerProfile = async() => {

    const id_profile_icon = localStorage.getItem('newProfileIconId')
    const nickname = inputNickname.value

    if (nickname != ''){
        
        const profile = {
            apelido: nickname,
            id_usuario: userId,
            id_foto_perfil: id_profile_icon
        }
    
        const rsPost = await postProfile(profile)

        if(localStorage.getItem('editProfile') == 'true'){
            editProfile()
        }

        closeContainerCreateProfile()
        setProfileCards()
    
    } else {

        Swal.fire({
            timer: 2000,
            title: '<p class="text-2xl text-secundary"> Escolha um apelido! <p>',
            icon: 'warning',
            iconColor: '#FD3131',
            showConfirmButton: false,
            width: '25rem',
            padding: '0 0 28px 0',
            heightAuto: false
        }) 

    }

}

// Choose icon

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

            if(localStorage.getItem('editProfile') == 'true'){
                containerUpdateProfileIcon.id = icon.id
                containerUpdateProfileIcon.style.backgroundImage = `url(${icon.foto})` 
            }else{
                buttonChooseIcon.id = icon.id
                buttonChooseIcon.style.backgroundImage = `url(${icon.foto})` 
            }
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

// Edit (Update/Delete) icon

const createButtonEdit = () => {

    const buttonEdit = document.createElement('button')
    buttonEdit.classList.add('absolute', 'w-32', 'h-32', 'bg-dark_gray/50', 'top-0', 'flex', 'items-center', 'justify-center', 'max-sm:h-28', 'max-sm:w-28', 'max-md:rounded-md')

    const editIcon = document.createElement('img')
    editIcon.src = '../images/svg/pencil.svg'
    editIcon.alt = 'Editar perfil'
    editIcon.classList.add('w-12', 'h-12', 'p-2', 'border-2', 'rounded-full', 'border-white', 'border-solid', 'max-sm:w-10', 'max-sm:h-10')

    buttonEdit.appendChild(editIcon)

    return buttonEdit

}

const editProfileTexts = () => {

    let text = manageProfilesText.textContent.includes('Editar')  ? 'Pronto' : 'Editar' 
    let img = manageProfilesImg.src.includes('close') ? '../images/svg/pencil.svg' : '../images/svg/close.svg'
    let title = pageTitle.textContent.includes('Quem está assistindo?') ? 'Editar perfis' : 'Quem está assistindo?'
    manageProfilesText.textContent = text
    manageProfilesImg.src = img
    pageTitle.textContent = title

    if(text == 'Editar')
        localStorage.setItem('editProfile', 'false')
    else
        localStorage.setItem('editProfile', 'true')

}

const editProfile = () => {

    editProfileTexts()
    setEditButtons()

}

const addUpdateContainer = () => {

    containerUpdateProfile.classList.remove('hidden')
    containerUpdateProfile.classList.add('flex')
    header.classList.remove('z-10')

}

const setUpdateContainer = async(profileId) => {

    const profile = await getProfileById(profileId)
    inputNicknameUpdate.value = profile.perfil[0].apelido
    containerUpdateProfileIcon.style.backgroundImage = `url(${profile.perfil[0].foto_perfil})`
    containerUpdateProfileIcon.id = profile.perfil[0].id_foto_perfil

}

const closeUpdateContainer = () => {

    containerUpdateProfile.classList.remove('flex')
    containerUpdateProfile.classList.add('hidden')
    header.classList.add('z-10')

}

const setEditButtons = () => {

    if(localStorage.getItem('editProfile') == 'true'){

        for (let button of containerProfiles.children) {
        
            if(button.classList.contains('icon')){
    
                const buttonEdit = createButtonEdit()
            
                buttonEdit.addEventListener('click', () => {
    
                    addUpdateContainer()
                    setUpdateContainer(button.id)
    
                })
    
                button.appendChild(buttonEdit)
    
            }
    
        }

        localStorage.setItem('homeLogin', '#')
        
    }else{
    
        for (let button of containerProfiles.children) {

            if(button.classList.contains('icon')){

                if(button.children[2]){

                    button.removeChild(button.children[2])
                
                }
            
            }
        
        }
        
        localStorage.setItem('homeLogin', './home.html')
    
    }

}

const updateUserProfile = async() => {

    const id_profile_icon = containerUpdateProfileIcon.id
    const nickname = inputNicknameUpdate.value

    const profile = {
        apelido: nickname,
        id_usuario: userId,
        id_foto_perfil: id_profile_icon
    }

    const rsUpdate = await updateProfile(profile, localStorage.getItem('profileId'))
       
    editProfile()
    closeUpdateContainer()
    setProfileCards()

}

const deleteUserProfile = async() => {

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
    
          title: '<p class="text-2xl text-secundary font-poppins"> Tem certeza que deseja excluir este perfil? </p>',
          html: '<p class="text-dark_gray"> Você perderá seus filmes favoritos </p>',
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
    
                const rsDelete = await deleteProfile(localStorage.getItem('profileId'))
           
                editProfile()
                closeUpdateContainer()
                setProfileCards()
    
            }
    
        })

    } else {

        swalWithBootstrapButtons.fire({
    
            title: '<p class="text-2xl text-secundary font-poppins"> Tem certeza que deseja excluir este perfil? </p>',
            html: '<p class="text-dark_gray"> Você perderá seus filmes favoritos </p>',
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
      
                  const rsDelete = await deleteProfile(localStorage.getItem('profileId'))
             
                  editProfile()
                  closeUpdateContainer()
                  setProfileCards()
      
              }
      
          })

    }

}

buttonCloseCreateProfile.addEventListener('click', closeContainerCreateProfile)
buttonChooseIcon.addEventListener('click', addChooseIcon)
containerUpdateProfileIcon.addEventListener('click', addChooseIcon)
buttonCloseChooseIcon.addEventListener('click', closeChooseIcon)
buttonCreateProfile.addEventListener('click', registerProfile)
buttonUpdateProfile.addEventListener('click', updateUserProfile)
buttonDeleteProfile.addEventListener('click', deleteUserProfile)
manageProfiles.addEventListener('click', editProfile)
buttonCloseUpdateProfile.addEventListener('click', closeUpdateContainer)

inputNickname.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') { 
        event.preventDefault()
        registerProfile()
    }
})

inputNicknameUpdate.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') { 
        event.preventDefault()
        updateUserProfile()
    }
})

window.addEventListener('load', async() => {
    localStorage.setItem('homeLogin', './home.html')
    const icons = await getProfileIconsByCategories()
    setIconSection(icons.fotos_perfil)
    setProfileCards()
})