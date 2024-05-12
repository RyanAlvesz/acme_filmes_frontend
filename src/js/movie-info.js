'use strict'

import { getMovieById, deleteFavoriteMovie } from './functions.js'
import { postFavoriteProfileMovie, validationFavoriteMovie } from './favorite-movie.js'
import { closeLoading } from './loading.js'

const movieId = localStorage.getItem('movieId')
const profileId = localStorage.getItem('profileId')

const movieBackground = document.getElementById('movie-background')
const moviePoster = document.getElementById('movie-poster')
const movieTitle = document.getElementById('movie-title')
const movieDescription = document.getElementById('movie-description')
const movieClassification = document.getElementById('movie-classification')
const movieClassificationMobile = document.getElementById('movie-classification-description-mobile')
const movieClassificationDescription = document.getElementById('movie-classification-description')
const movieDuration = document.getElementById('movie-duration')
const movieRelease = document.getElementById('movie-release')
const movieDirectors = document.getElementById('movie-directors')
const movieActors = document.getElementById('movie-actors')
const movieGenres = document.getElementById('movie-genres')
const favoriteButton = document.getElementById('favorite-button')
const x = window.matchMedia('(max-width: 768px)')

const setMovieInfo = async (movie) => {

    document.title = movie.nome

    movieBackground.style.backgroundImage = `url(${movie.foto_banner})`
    movieTitle.textContent = movie.nome
    movieDescription.textContent = movie.sinopse
    movieClassification.src = movie.classificacao[0].icone
    movieClassification.alt = movie.classificacao[0].silga
    movieClassificationDescription.children[0].textContent = movie.classificacao[0].classificacao_indicativa
    movieClassificationDescription.children[1].textContent = movie.classificacao[0].descricao
    movieClassificationMobile.textContent = movie.classificacao[0].classificacao_indicativa

    const DateTime = luxon.DateTime

    changeBgPoster(x, movie)

    let dr = DateTime.fromISO(movie.duracao)
    let durationValues = movie.duracao.split(':')
    let hours = Number(durationValues[0]) > 1 ? 'horas' : 'hora'
    let minutes = Number(durationValues[1]) > 1 ? 'minutos' : 'minuto'
    let drFormatedText = `HH '${hours} e' mm '${minutes}'`
    movieDuration.textContent = dr.toFormat(drFormatedText)
    
    let dt = DateTime.fromISO(movie.data_lancamento)
    movieRelease.textContent = dt.toLocaleString(DateTime.DATE_FULL)

    if(movie.diretores){
        movieDirectors.classList.remove('hidden')
        movie.diretores.forEach(director => {
            let directorName = document.createElement('p')
            directorName.textContent = director.nome
            directorName.classList.add('max-md:text-base')
            movieDirectors.children[1].appendChild(directorName)
        })
    }

    if(movie.atores){
        movieActors.classList.remove('hidden')
        movie.atores.forEach(actor => {
            let actorName = document.createElement('a')
            actorName.classList.add('hover:underline', 'w-fit')
            actorName.href = './actor-info.html'
            actorName.textContent = actor.nome
            actorName.classList.add('max-md:text-base')
            actorName.addEventListener('click', () => {
                localStorage.setItem('actorId', actor.id)
            })
            movieActors.children[1].appendChild(actorName)
        })
    }

    if(movie.generos){
        movieGenres.classList.remove('hidden')
        movie.generos.forEach(genre => {
            let genreName = document.createElement('p')
            genreName.classList.add('max-md:text-base')
            genreName.textContent = genre.nome
            movieGenres.children[1].appendChild(genreName)
        })
    }

    const validationFavorite = await validationFavoriteMovie(profileId, movieId)

    if(validationFavorite){
        localStorage.setItem('movieFavorite', 'true')
        favoriteButton.children[0].src = '../images/svg/correct.svg'
    }else{
        localStorage.setItem('movieFavorite', 'false')
    }

    closeLoading()

}

const favoriteMovie = async() => {

    const movieFavorite = localStorage.getItem('movieFavorite')

    if(movieFavorite == 'true'){

        const rsDelte = await deleteFavoriteMovie(localStorage.getItem('favoriteMovieId'))
        favoriteButton.children[0].src = '../images/svg/add.svg'
        localStorage.setItem('movieFavorite', 'false')

    }else{

        postFavoriteProfileMovie(profileId, movieId)
        favoriteButton.children[0].src = '../images/svg/correct.svg'
        localStorage.setItem('movieFavorite', 'true')

    }

}

const changeBgPoster = (x, movie) => {
    if (x.matches) {
        moviePoster.style.backgroundImage = `url(${movie.foto_banner})`
    } else {
        moviePoster.style.backgroundImage = `url(${movie.foto_capa})`
    }
}

favoriteButton.addEventListener('click', favoriteMovie)

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

window.addEventListener('load', async() => {

    const movie = await getMovieById(movieId)
    setMovieInfo(movie.filme[0])

    x.addEventListener('change', () => {    
        changeBgPoster(x, movie.filme[0])
    })

})