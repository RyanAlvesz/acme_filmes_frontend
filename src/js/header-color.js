'use strict'

const header = document.getElementsByTagName('header')

window.addEventListener('scroll', () => {

    if(window.scrollY > header[0].id){
        header[0].classList.add('bg-gray-header')
        if(header[0].id != 90){
            header[0].classList.add('max-md:bg-transparent')
        }
    }else{
        header[0].classList.remove('bg-gray-header')
        if(header[0].id != 90){
            header[0].classList.remove('max-md:bg-transparent')
        }
    }

})