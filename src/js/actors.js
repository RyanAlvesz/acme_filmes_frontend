'use strict'

import { getActors } from './functions.js'

const createActorCard = (actor) => {

    const button = document.createElement('button')
    button.classList.add('grid', 'grid-cols-[calc(((86vh-2rem*2)/3)*35/45)_1fr]', 'w-[calc((100vw-7rem-2.5rem*2)/3)]', 'h-[calc((86vh-2rem*2)/3)]', 'drop-shadow-[0px_0px_2px_#373737]', 'bg-dark_gray', 'shadow-secundary', 'shadow-[-5px_5px_0_0]', 'rounded-xl', 'overflow-hidden', 'ease-linear', 'duration-200', 'hover:shadow-main', 'hover:scale-[1.01]')

    button.addEventListener('click', () => {
        localStorage.setItem('actorId', actor.id)
        window.location = './actor-info.html'
    })

    const img = document.createElement('img')
    img.classList.add('h-full', 'w-full', 'object-cover')
    img.src = actor.foto
    img.alt = actor.nome

    const div = document.createElement('div')
    div.classList.add('text-white', 'flex', 'flex-col', 'items-center', 'justify-center', 'h-full', 'gap-2')

    const h2 = document.createElement('h2')
    h2.classList.add('text-2xl', 'font-semibold', 'drop-shadow-[-1px_1px_0px_#ff0000]')
    h2.textContent = actor.nome

    const DateTime = luxon.DateTime
    const dtActorBirth = DateTime.fromISO(actor.data_nascimento)
    const diff = dtActorBirth.diffNow(['years'])
    const years = diff.toString().replace('P-', '').split('.')[0]

    const p = document.createElement('p')
    p.classList.add('text-xl')
    p.textContent = `${years} anos`

    button.replaceChildren(img, div)
    div.replaceChildren(h2, p)

    return button

}

const setActorsCards = (actors) => {

    const main = document.getElementById('main')
    actors.forEach(actor => {
        const button = createActorCard(actor)
        main.appendChild(button)    
    })

}

window.addEventListener('load', async() => {

    const actors = await getActors()
    setActorsCards(actors.atores)

})