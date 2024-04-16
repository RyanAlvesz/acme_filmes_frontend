'use strict'

import { createMoviesCard } from "./movie-card.js";
import { getMoviesByActor, getActorById, getNationalityById, getActorsNationalities } from "./functions.js"

const actorId = localStorage.getItem('actorId')

const actorMoviesContainer = document.getElementById('actor-movies-container')
const actorName = document.getElementById('actor-name')
const actorBirth = document.getElementById('actor-birth')
const actorNationality = document.getElementById('actor-nationality')
const actorNameShadow = document.getElementById('actor-name-shadow')
const actorBiography = document.getElementById('actor-biography')
const actorPhoto = document.getElementById('actor-photo')

let size = {

    h: 'h-[20vh]',
    w: 'w-[calc(20vh*30/45)]'

}

const createMovies = (moviesArray, cardSize) => {
    
    moviesArray.forEach(movie => {
        actorMoviesContainer.appendChild(createMoviesCard(movie, cardSize))
    })

}

const setActorInfo = async(actor) => {

    document.title = actor.nome

    actorName.textContent = actor.nome
    actorNameShadow.textContent = actor.nome
    actorBiography.textContent = actor.biografia
    
    const DateTime = luxon.DateTime
    let dt = DateTime.fromISO(actor.data_nascimento)
    actorBirth.textContent = dt.toLocaleString(DateTime.DATE_SHORT)

    if(actor.nacionalidades){

        actorNationality.previousElementSibling.classList.remove('opacity-0')
        actorNationality.textContent = actor.nacionalidades[0].gentilico

    }

    actorPhoto.style.backgroundImage = `url(${actor.foto})`

}

actorMoviesContainer.addEventListener('wheel', (e) => {

    e.preventDefault()
    actorMoviesContainer.scrollLeft += e.deltaY
    actorMoviesContainer.scrollLeft += e.deltaX
    actorMoviesContainer.style.scrollBehavior = 'auto'

})

window.addEventListener('load', async() => {

    const moviesActorJSON = await getMoviesByActor(actorId)
    const actorJSON = await getActorById(actorId)
    setActorInfo(actorJSON.ator[0])
    createMovies(moviesActorJSON.filmes, size)
})

