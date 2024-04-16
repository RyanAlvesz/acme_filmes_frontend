'use strict'

import { getMovieById, getClassificationById } from './functions.js'

const movieId = localStorage.getItem('movieId')

const movieBackground = document.getElementById('movie-background')
const moviePoster = document.getElementById('movie-poster')
const movieTitle = document.getElementById('movie-title')
const movieDescription = document.getElementById('movie-description')
const movieClassification = document.getElementById('movie-classification')
const movieClassificationDescription = document.getElementById('movie-classification-description')
const movieDuration = document.getElementById('movie-duration')
const movieRelease = document.getElementById('movie-release')
const movieDirectors = document.getElementById('movie-directors')
const movieActors = document.getElementById('movie-actors')
const movieGenres = document.getElementById('movie-genres')

const setMovieInfo = async (movie) => {

    const classificationJSON = await getClassificationById(movie.id_classificacao)
    const classification = classificationJSON.classificacao[0]

    document.title = movie.nome

    movieBackground.style.backgroundImage = `url(${movie.foto_banner})`
    moviePoster.style.backgroundImage =  `url(${movie.foto_capa})`
    movieTitle.textContent = movie.nome
    movieDescription.textContent = movie.sinopse
    movieClassification.src = classification.icone
    movieClassification.alt = classification.sigla
    movieClassificationDescription.children[0].textContent = classification.classificacao_indicativa
    movieClassificationDescription.children[1].textContent = classification.descricao
    
    let durationValues = movie.duracao.split(':')
    let hours = Number(durationValues[0]) > 1 ? 'horas' : 'hora'
    let duration = `${durationValues[0].split('')[1]} ${hours} e ${durationValues[1]} minutos`
    movieDuration.textContent = duration
    
    const DateTime = luxon.DateTime
    let dt = DateTime.fromISO(movie.data_lancamento)
    movieRelease.textContent = dt.toLocaleString(DateTime.DATE_FULL)

    if(movie.diretores){
        movieDirectors.classList.remove('opacity-0')
        movie.diretores.forEach(director => {
            let directorName = document.createElement('p')
            directorName.textContent = director.nome
            movieDirectors.children[1].appendChild(directorName)
        })

    }

    if(movie.atores){
        movieActors.classList.remove('opacity-0')
        movie.atores.forEach(actor => {
            let actorName = document.createElement('a')
            actorName.classList.add('hover:underline', 'w-fit')
            actorName.href = './actor-info.html'
            actorName.textContent = actor.nome
            actorName.addEventListener('click', () => {
                localStorage.setItem('actorId', actor.id)
            })
            movieActors.children[1].appendChild(actorName)
        })
    }

    if(movie.generos){
        movieGenres.classList.remove('opacity-0')
        movie.generos.forEach(genre => {
            let genreName = document.createElement('p')
            genreName.textContent = genre.nome
            movieGenres.children[1].appendChild(genreName)
        })
    }

}

window.addEventListener('load', async() => {

    const movie = await getMovieById(movieId)
    setMovieInfo(movie.filme[0])

})

moviePoster.addEventListener('click', async() => {

    const movie = await getMovieById(movieId)
    window.location = movie.filme[0].link_trailer

})

movieClassification.addEventListener('mouseover', () => {
    movieClassificationDescription.classList.remove('opacity-0')
})
movieClassification.addEventListener('mouseout', () => {
    movieClassificationDescription.classList.add('opacity-0')
})