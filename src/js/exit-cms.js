'use strict'

const exitCMSButton = document.getElementById('exit-cms-button').addEventListener('click', () => {
    localStorage.clear()
    window.location = '../../../index.html'
})