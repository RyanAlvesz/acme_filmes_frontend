'use strict'

// Montagem de itens

import { getMoviesByGenre, getFavoriteMoviesProfile, getFeaturedMovie, deleteFavoriteMovie} from './functions.js'
import { postFavoriteProfileMovie, validationFavoriteMovie } from './favorite-movie.js'
import { createMoviesCard } from './movie-card.js'

const colorThief = new ColorThief()

const profileId = localStorage.getItem('profileId')
const profileNickname = localStorage.getItem('profileNickname')
const profileIconUrl = localStorage.getItem('iconURL')

const scrollHome = document.getElementById('scroll-home')
const closeMenu = document.getElementById('close-menu')
const openMenu = document.getElementById('open-menu')
const menu = document.getElementById('menu')
const profileNicknameSpan = document.getElementById('profile-nickname')
const profileIcon = document.getElementById('profile-icon')
const buttonFavoriteFeaturedMovie = document.getElementById('button-favorite-featured-movie')
const buttonFavoriteFeaturedMovieMobile = document.getElementById('button-favorite-featured-movie-mobile')
const sectionContainer = document.getElementById('section-container')
const FMmobileGradient = document.getElementById('featured-movie-mobile-gradient')
const loadingCard = document.getElementById('loading')
const x = window.matchMedia('(max-width: 768px)')

const setFeaturedMovie = async(featuredMovie) => {
    
    // featured movie infos
    const FMcover = document.getElementById('featured-movie-bagckround')
    const FMtitle = document.getElementById('featured-movie-title')
    const FMyear = document.getElementById('featured-movie-year')
    const FMdirector = document.getElementById('featured-movie-director')
    const FMplay = document.getElementById('featured-movie-play')
    const FMcardMobile = document.getElementById('featured-movie-mobile')
    const FMcardMobileImg = document.getElementById('featured-movie-mobile-img')
    const FMcardMobilePlay = document.getElementById('featured-movie-mobile-play')

    localStorage.setItem('featuredMovieId', featuredMovie.id)
    
    const validationFavorite = await validationFavoriteMovie(profileId, featuredMovie.id)

    if(validationFavorite){
        localStorage.setItem('FMmovieFavorite', 'true')
        buttonFavoriteFeaturedMovie.children[0].src = '../images/svg/correct.svg'
        buttonFavoriteFeaturedMovieMobile.children[0].src = '../images/svg/correct.svg'
    }else{
        localStorage.setItem('FMmovieFavorite', 'false')
    }

    FMcover.style.backgroundImage = `url('${featuredMovie.foto_banner}')`
    FMtitle.textContent = featuredMovie.nome
    FMyear.textContent = featuredMovie.data_lancamento.split('-')[0]
    FMcardMobile.style.backgroundImage = `url('${featuredMovie.foto_capa}')`
    // FMcardMobileImg.src = featuredMovie.foto_capa   
    FMcardMobileImg.src = 'https://firebasestorage.googleapis.com/v0/b/acme-filmes.appspot.com/o/images%2Fttpd-17.jpeg?alt=media&token=506484e6-7c71-47c3-8dca-780642562ef8'
    FMcardMobileImg.crossOrigin = "Anonymous"
  
    if(featuredMovie.diretores){
        FMdirector.textContent = `por ${featuredMovie.diretores[0].nome}`
    }else{
        FMdirector.textContent = `para se divertir`
    }

    FMcardMobileImg.addEventListener('load', function() {
       let rgb = colorThief.getPalette(FMcardMobileImg)[5]
        localStorage.setItem('FMrgb', rgb)
       changeBgMobile(x, rgb)
    })

    FMplay.addEventListener('click', () => {window.location = './movie-info.html'; localStorage.setItem('movieId', featuredMovie.id)})
    FMcardMobilePlay.addEventListener('click', () => {window.location = './movie-info.html'; localStorage.setItem('movieId', featuredMovie.id)})

}
  
const createMoviesSection = (genre) => {

    const section = document.createElement('section')
    section.classList.add('flex', 'flex-col', 'gap-4', 'pb-4', 'min-h-[40vh]', 'movies-container', 'relative')

    const h2 = document.createElement('h2')
    h2.classList.add('font-semibold', 'text-white', 'text-3xl', 'h-[4vh]', 'max-md:text-2xl')
    h2.textContent = genre.genero.toUpperCase()
    
    const moviesContainer = document.createElement('div')
    moviesContainer.classList.add('h-[calc(36vh-1rem-2rem)]', 'flex', 'items-end', 'gap-6', 'w-[calc(100vw-7rem)]', 'overflow-x-auto', 'place-self-center', 'max-md:w-[calc(100vw-3.5rem)]')
    
    const cardSize = {
        h: 'h-[calc(36vh-1rem-2rem)]',
        w: 'w-[calc((36vh-1rem-2rem)*300/450)]'
    }

    const buttonLeft = document.createElement('button')
    buttonLeft.classList.add('max-md:hidden', 'absolute', 'h-[calc(36vh-1rem-2rem)]', 'top-[calc(4vh+1rem)]', '-left-12', 'duration-100', 'ease-linear', 'opacity-0')
    buttonLeft.addEventListener('click', () => {
        moviesContainer.scrollLeft -= 150
    })

    const buttonLeftImg = document.createElement('img')
    buttonLeftImg.classList.add('w-12')
    buttonLeftImg.src = '../images/svg/arrow-prev.svg'
    buttonLeftImg.alt = 'Seta para esquerda'

    const buttonRight = document.createElement('button')
    buttonRight.classList.add('max-md:hidden', 'absolute', 'h-[calc(36vh-1rem-2rem)]', 'top-[calc(4vh+1rem)]', '-right-12', 'duration-100', 'ease-linear', 'opacity-0')
    buttonRight.addEventListener('click', () => {
        moviesContainer.scrollLeft += 150
    })

    const buttonRightImg = document.createElement('img')
    buttonRightImg.classList.add('w-12')
    buttonRightImg.src = '../images/svg/arrow-next.svg'
    buttonRightImg.alt = 'Seta para direita'

    genre.filmes.forEach(movie => {    

        const card = createMoviesCard(movie, cardSize)
        moviesContainer.appendChild(card)

    })

    section.addEventListener('mouseover', () => {
        buttonLeft.classList.remove('opacity-0')
        buttonRight.classList.remove('opacity-0')
    })

    section.addEventListener('mouseleave', () => {
        buttonLeft.classList.add('opacity-0')
        buttonRight.classList.add('opacity-0')
    })
    
    section.replaceChildren(h2, moviesContainer, buttonLeft, buttonRight)
    buttonLeft.appendChild(buttonLeftImg)
    buttonRight.appendChild(buttonRightImg)

    return section

}

const addMovies = async(moviesJSON) => {

    moviesJSON.forEach(genre => {
            
        let movieSection = createMoviesSection(genre)
        sectionContainer.appendChild(movieSection)
        
    })

}

const setProfileInfo = () => {

    profileNicknameSpan.textContent = profileNickname
    profileIcon.style.backgroundImage = `url(${profileIconUrl})`

}

const setMovies = async() => {

    const moviesByGenreJSON = await getMoviesByGenre()
    const favoriteMovies = await getFavoriteMoviesProfile(profileId)
    const featuredMovie = await getFeaturedMovie()

    sectionContainer.replaceChildren('')

    if(favoriteMovies.status_code == 200){
        favoriteMovies.genero = 'Sua lista'
        const favoriteMoviesArray = [
            favoriteMovies
        ]
        addMovies(favoriteMoviesArray)
    }

    addMovies(moviesByGenreJSON.generos)
    setFeaturedMovie(featuredMovie.filme)

    setTimeout(() => {
        loadingCard.classList.add('hidden')
    }, 1500)

}

const favoriteMovie = async() => {

    const FMmovieFavorite = localStorage.getItem('FMmovieFavorite')

    if(FMmovieFavorite == 'true'){

        const rsDelte = await deleteFavoriteMovie(localStorage.getItem('favoriteMovieId'))
        buttonFavoriteFeaturedMovie.children[0].src = '../images/svg/add.svg'
        buttonFavoriteFeaturedMovieMobile.children[0].src = '../images/svg/add.svg'
    
    }else{

        postFavoriteProfileMovie(profileId, localStorage.getItem('featuredMovieId'))
        buttonFavoriteFeaturedMovie.children[0].src = '../images/svg/correct.svg'
        buttonFavoriteFeaturedMovieMobile.children[0].src = '../images/svg/correct.svg'

    }

    setTimeout(() => {
        setMovies()
    }, 100);


}
  
const changeBgMobile = (x, rgb) => {
    if (x.matches) {
        FMmobileGradient.style.background = `linear-gradient(180deg, rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1) 5%, rgba(20,20,20,0) 95%)`
    } else {
        FMmobileGradient.style.background = `linear-gradient(180deg, rgba(20,20,20,0.85) 0%, rgba(20,20,20,0.70) 8%, rgba(0,0,0,0.4) 25%, rgba(0,0,0,0.3) 50%, rgba(20,20,20,0.4) 65%, rgba(20,20,20,0.6) 75%, rgba(20,20,20,0.8) 85%, rgba(20,20,20,1) 100%)`
    }
}

x.addEventListener('change', () => {    
    changeBgMobile(x, localStorage.getItem('FMrgb').split(','))
})

buttonFavoriteFeaturedMovie.addEventListener('click', favoriteMovie)
buttonFavoriteFeaturedMovieMobile.addEventListener('click', favoriteMovie)

openMenu.addEventListener('click', () => {
    menu.classList.remove('translate-y-full')
})

closeMenu.addEventListener('click', () => {
    menu.classList.add('translate-y-full')
})

scrollHome.addEventListener('click', () => {

    window.scroll({
        top: 0,
        behavior: 'smooth'
    })

})

window.addEventListener('load', () => {
    
    setMovies()
    setProfileInfo()

})

