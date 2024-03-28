'use strict'

const header = document.getElementsByTagName('header')

window.addEventListener('scroll', () => {

    if(window.scrollY > header[0].id){
        header[0].classList.add('bg-gray-header')
    }else{
        header[0].classList.remove('bg-gray-header')
    }

})