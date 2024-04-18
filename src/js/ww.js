'use strict'

import {getProfilesByUser, getProfileIcons, postProfile, updateProfile, getProfileIconsByCategories } from './functions.js'

const userId = localStorage.getItem('userId')

const inputNickname = document.getElementById('nickname')
const containerAddProfile = document.getElementById('container-add-profile')
const containerAddProfileTitle = document.getElementById('container-add-profile-title')
const containerChooseIcon = document.getElementById('container-choose-icon')
const buttonCloseCreateProfile = document.getElementById('button-close-create-profile')
const buttonChooseIcon = containerAddProfile.children[2].children[0]
const buttonCloseChooseIcon = document.getElementById('button-close-choose-icon')
const buttonCreateProfile = document.getElementById('button-create-profile')
const containerProfiles = document.getElementById('container-profiles')
const manageProfiles = document.getElementById('manage-profiles')
const manageProfilesImg = document.getElementById('manage-profiles-img')
const manageProfilesText = document.getElementById('manage-profiles-text')
const pageTitle = document.getElementById('page-title')

const createProfileCards = (profile) => {

    const button = document.createElement('button')
    button.classList.add('flex', 'flex-col', 'items-center', 'justify-around', 'h-full', 'relative', '[&>img:nth-child(1)]:hover:drop-shadow-[0px_0px_5px_#994a71]', 'icon')

    button.addEventListener('click', () => {
        localStorage.setItem('profileId', profile.id)
        localStorage.setItem('iconId', profile.id_foto_perfil)
        localStorage.setItem('iconURL', profile.foto_perfil)
        // window.location = './home.html'
    })

    const img = document.createElement('img')
    img.classList.add('w-32', 'h-32', 'object-cover', 'duration-200')
    img.src = profile.foto_perfil
    img.alt = profile.nome_foto 

    const span = document.createElement('span')
    span.classList.add('text-xl', 'text-white')
    span.textContent = profile.apelido

    button.replaceChildren(img, span)

    return button

}

const createAddProfileButton = () => {

    const divMain = document.createElement('div')
    divMain.classList.add('flex', 'flex-col', 'items-center', 'justify-around', 'h-full', 'cursor-pointer')
    divMain.addEventListener('click', () => {addContainerCreateProfile({method: 'post'})})

    const divSecundary = document.createElement('div')
    divSecundary.classList.add('flex', 'items-center', 'justify-center', 'w-32', 'h-32') 

    const button = document.createElement('button')
    button.classList.add('h-4/5', 'w-4/5', 'rounded-full', 'bg-gray', 'flex', 'items-center', 'justify-center', 'p-1')

    const img = document.createElement('img')
    img.src = '../images/svg/plus.svg'
    img.alt = 'Adicionar perfil'

    const span = document.createElement('span')
    span.classList.add('text-xl', 'text-white')
    span.textContent = 'Adicionar Perfil'

    divMain.replaceChildren(divSecundary, span)
    divSecundary.appendChild(button)
    button.appendChild(img)

    return divMain

}

const setProfileCards = async() => {

    const profiles = await getProfilesByUser(userId)
    containerProfiles.replaceChildren('')
    
    profiles.perfis.forEach(profile => {
        const button = createProfileCards(profile)
        containerProfiles.appendChild(button)
    })

    if(profiles.perfis.length < 5){
        const button = createAddProfileButton()
        containerProfiles.appendChild(button)
    }

}

const closeContainerCreateProfile = () => {

    containerAddProfile.classList.add('hidden')
    containerAddProfile.classList.remove('flex')

}

const CloseChooseIcon = () => {

    containerChooseIcon.classList.remove('grid')
    containerChooseIcon.classList.add('hidden')

}

const addContainerCreateProfile = async(info) => {
    
    const icons = await getProfileIcons()
    
    if(info.method.toLowerCase() == 'post'){
        containerAddProfileTitle.textContent = 'Criar Perfil' 
        const randomIconId = Math.floor(Math.random()*(icons.fotos.length)) 
        buttonChooseIcon.style.backgroundImage = `url(${icons.fotos[randomIconId].foto})`
        buttonChooseIcon.id = icons.fotos[randomIconId].id
    }else{
        containerAddProfileTitle.textContent = 'Editar Perfil'
        icons.fotos.forEach((icon)=>{
            if(icon.id == info.iconId){
                buttonChooseIcon.style.backgroundImage = `url(${icon.foto})`
                buttonChooseIcon.id = icon.id
            }
        })
    }
    
    containerAddProfile.classList.remove('hidden')
    containerAddProfile.classList.add('flex')

}

const registerProfile = async() => {

    const id_profile_icon = buttonChooseIcon.id
    const nickname = inputNickname.value

    const profile = {
        apelido: nickname,
        id_usuario: userId,
        id_foto_perfil: id_profile_icon
    }

    if(containerAddProfileTitle.textContent == 'Criar Perfil'){
        const rsPost = await postProfile(profile)
    }else{
        const rsUpdate = await updateProfile(profile)
    }

    inputNickname.value = ''
    closeContainerCreateProfile()
    setProfileCards()

}

const createIconsSection = (categoryJSON) => {

    const divMain = document.createElement('div')
    divMain.classList.add('w-full', 'grid', 'grid-rows-[auto_15vh]', 'gap-2')
    
    const h2 = document.createElement('h2')
    h2.classList.add('text-white', 'text-xl', 'font-semibold', 'px-14')
    h2.textContent = categoryJSON.categoria

    const divSecundary = document.createElement('div')
    divSecundary.classList.add('grid', 'grid-cols-[auto_1fr_auto]', 'gap-2')

    const buttonLeft = document.createElement('button')
    const buttonLeftImg = document.createElement('img')
    buttonLeftImg.classList.add('w-12')
    buttonLeftImg.src = '../images/svg/arrow-prev.svg'
    buttonLeftImg.alt = 'Seta para esquerda'

    const buttonRight = document.createElement('button')
    const buttonRightImg = document.createElement('img')
    buttonRightImg.classList.add('w-12')
    buttonRightImg.src = '../images/svg/arrow-next.svg'
    buttonRightImg.alt = 'Seta para direita'


    const divIcons = document.createElement('div')
    divIcons.classList.add('flex', 'items-center', 'gap-4', 'w-[calc(100vw-7rem-6rem-1rem)]', 'overflow-x-scroll', 'overflow-y-hidden')

    categoryJSON.fotos.forEach((icon) => {

        const buttonIcon = document.createElement('button')
        buttonIcon.classList.add('h-[15vh]', 'w-[15vh]', 'bg-cover', 'bg-center', 'flex-shrink-0')
        buttonIcon.style.backgroundImage = `url(${icon.foto})`

        buttonIcon.addEventListener('click', () => {

            buttonChooseIcon.style.backgroundImage = `url(${icon.foto})`
            buttonChooseIcon.id = icon.id
            CloseChooseIcon()

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

const createButtonEdit = () => {

    const buttonEdit = document.createElement('button')
    buttonEdit.classList.add('absolute', 'w-32', 'h-32', 'bg-dark_gray/50', 'top-[6px]', 'flex', 'items-center', 'justify-center')

    const editIcon = document.createElement('img')
    editIcon.src = '../images/svg/pencil.svg'
    editIcon.alt = 'Editar perfil'
    editIcon.classList.add('w-12', 'h-12', 'p-2', 'border-2', 'rounded-full', 'border-white', 'border-solid')

    buttonEdit.appendChild(editIcon)

    return buttonEdit

}

buttonCloseCreateProfile.addEventListener('click', closeContainerCreateProfile)
buttonCloseChooseIcon.addEventListener('click', CloseChooseIcon)
buttonChooseIcon.addEventListener('click', () => { containerChooseIcon.classList.remove('hidden'); containerChooseIcon.classList.add('grid')})
inputNickname.addEventListener('keypress', (event) => { if (event.key === 'Enter') { event.preventDefault(); registerProfile() }})
buttonCreateProfile.addEventListener('click', registerProfile)
manageProfiles.addEventListener('click', () => {

    let text = manageProfilesText.textContent.includes('Gerenciar')  ? 'Fechar' : 'Gerenciar' 
    let img = manageProfilesImg.src.includes('close') ? '../images/svg/pencil.svg' : '../images/svg/close.svg'
    let title = pageTitle.textContent.includes('Quem está assistindo?') ? 'Gerenciar perfis' : 'Quem está assistindo?'
    manageProfilesText.textContent = text
    manageProfilesImg.src = img
    pageTitle.textContent = title

    if(text == 'Fechar'){
        for (let button of containerProfiles.children) {
            if(button.classList.contains('icon')){
                const buttonEdit = createButtonEdit()
                buttonEdit.addEventListener('click', () => {addContainerCreateProfile({method: 'update', iconId: button.id})})
                inputNickname.value = button.children[1].textContent
                button.appendChild(buttonEdit)
            }
        }
    }else{
        for (let button of containerProfiles.children) {
            if(button.classList.contains('icon')){
                button.removeChild(button.children[2])
            }
        }
    }


})

window.addEventListener('load', async() => {
    const icons = await getProfileIconsByCategories()
    setProfileCards()
    setIconSection(icons.fotos_perfil)
})