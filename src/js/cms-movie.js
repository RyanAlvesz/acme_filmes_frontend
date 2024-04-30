'use strict'

import { getClassifications, getMovies, getMoviesByName, postMovie, updateMovie, deleteMovie } from './functions.js'
import { uploadImage } from './firebase.js'


const moviesSection = document.getElementById('movies-section')
const buttonCreateMovie = document.getElementById('create-movie')
const postMovieContainer = document.getElementById('post-movie-container')
const buttonClosePostMovieContainer = document.getElementById('close-post-movie')
const editMovieContainer = document.getElementById('edit-movie-container')
const buttonCloseeditMovieContainer = document.getElementById('close-edit-movie')
const searchBar = document.getElementById('search')

// Post input
const nameInput = document.getElementById('name')
const synopsisInput = document.getElementById('synopsis')
const durationInput = document.getElementById('duration')
const releaseDateInput = document.getElementById('release-date')
const posterInput = document.getElementById('poster')
const bannerInput = document.getElementById('banner')
const featuredInput = document.getElementById('featured')
const trailerInput = document.getElementById('trailer')
const classificationInput = document.getElementById('classification')
const buttonRegisterMovie = document.getElementById('button-register-movie')

// Edit Input
const editNameInput = document.getElementById('edit-name')
const editSynopsisInput = document.getElementById('edit-synopsis')
const editDurationInput = document.getElementById('edit-duration')
const editReleaseDateInput = document.getElementById('edit-release-date')
const editPosterInput = document.getElementById('edit-poster')
const editBannerInput = document.getElementById('edit-banner')
const editFeaturedInput = document.getElementById('edit-featured')
const editTrailerInput = document.getElementById('edit-trailer')
const editClassificationInput = document.getElementById('edit-classification')
const buttonSaveEditMovie = document.getElementById('button-edit-movie')
const buttonDeleteMovie = document.getElementById('button-delete-movie')

const createMovieCard = (movie) => {

    const card = document.createElement('div')
    card.classList.add('bg-dark_gray', 'h-fit', 'w-[calc((80vw-3.5rem-1rem)/3)]', 'overflow-hidden', 'rounded-md', 'p-3', 'gap-3', 'grid', 'grid-cols-[auto_1fr]', 'ease-linear', 'duration-200', 'hover:scale-[1.01]', 'cursor-pointer')
    card.addEventListener('click', () => {
        setEditMovie(movie)
        localStorage.setItem('editMovieId', movie.id)
        localStorage.setItem('editMovieFeatured', movie.destaque)
        localStorage.setItem('editMoviePosterUrl', movie.foto_capa)
        localStorage.setItem('editMovieBannerUrl', movie.foto_banner)
        editMovieContainer.classList.remove('hidden')
        editMovieContainer.classList.add('fixed')
    })

    const moviePoster = document.createElement('img')
    moviePoster.classList.add('w-[calc(((80vw-3.5rem-1rem)/3-1.5rem)/3)]', 'h-[calc((((80vw-3.5rem-1rem)/3-1.5rem)/3)*45/30)]', 'object-cover', 'rounded-md')
    moviePoster.src = movie.foto_capa
    moviePoster.alt = movie.nome

    const div = document.createElement('div')
    div.classList.add('flex', 'flex-col', 'text-white', 'items-center', 'justify-center', 'gap-2')

    const movieTitle = document.createElement('h2')
    movieTitle.classList.add('font-semibold', 'text-2xl', 'drop-shadow-[-1px_1px_0px_#ff0000]','text-center')
    movieTitle.textContent = movie.nome

    const movieRelease = document.createElement('span')
    movieRelease.classList.add('font-semibold', 'text-lg')

    const DateTime = luxon.DateTime
    let dt = DateTime.fromISO(movie.data_lancamento)
    movieRelease.textContent = dt.toLocaleString(DateTime.DATE_SHORT)

    card.replaceChildren(moviePoster, div)
    div.replaceChildren(movieTitle, movieRelease)

    return card

}

const createMovies = (moviesArray) => {

    moviesSection.replaceChildren('')
    moviesArray.forEach((movie) => {
        const movieCard = createMovieCard(movie)
        moviesSection.appendChild(movieCard)
    })

}

const setMovies = async () => {
    const moviesJSON = await getMovies()
    createMovies(moviesJSON.filmes)
}

const createClassificationOption = (classification) => {

    const option = document.createElement('option')
    option.textContent = classification.sigla
    option.value = classification.id
    return option

}

const setClassifications = (classifications) => {

    classifications.forEach((classification) => {
        const option = createClassificationOption(classification)
        classificationInput.appendChild(option)
    })

}

const addPostMovieContainer = () => {
    postMovieContainer.classList.add('fixed')
    postMovieContainer.classList.remove('hidden')
}

const closePostMovieContainer = () => {
    postMovieContainer.classList.remove('fixed')
    postMovieContainer.classList.add('hidden')
    clearPostMovieContainer()
}

const closeEditMovieContainer = () => {
    editMovieContainer.classList.add('hidden')
    editMovieContainer.classList.remove('fixed')
}

const clearPostMovieContainer = () => {

    nameInput.value = ''
    synopsisInput.value = ''
    durationInput.value = '01:45'
    releaseDateInput.value = '2024-01-01'
    posterInput.value = ''
    bannerInput.value = ''
    featuredInput.checked = false
    trailerInput.value = ''

}

const postMovieFun = async() => {

    if(postInputValidation()){
        
        const imagesUrl = await getPostImagesUrl()
    
        const movie = {
            nome: nameInput.value,
            sinopse: synopsisInput.value,
            duracao: durationInput.value,
            data_lancamento: releaseDateInput.value,
            foto_capa: imagesUrl.posterUrl,
            foto_banner: imagesUrl.bannerUrl,
            destaque: featuredInput.checked,
            link_trailer: trailerInput.value,
            id_classificacao: classificationInput.value
        }
    
        const rsPost = await postMovie(movie)
        setMovies()

        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-dark_gray"> Filme cadastrado com sucesso <p>',
            icon: 'success',
            iconColor: '#3064B4',
            showConfirmButton: false,
            width: '25rem',
            heightAuto: false
        })

    }


}

const postInputValidation = () => {

    let validation = false

    if (
        nameInput.value == '' ||
        synopsisInput.value == '' ||
        durationInput.value == '' ||
        releaseDateInput.value == '' ||
        posterInput.length === 0 ||
        bannerInput.length === 0 ||
        classificationInput.value == '' ||
        trailerInput.value == ''
    ) {

        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-secundary"> Preencha todas as informações corretamente <p>',
            icon: 'warning',
            iconColor: '#FD3131',
            showConfirmButton: false,
            width: '25rem',
            heightAuto: false
        })

    } else {

        validation = true

    }

    return validation

}

const getImageUrl = async (file) => {

    const url = await uploadImage(file)
    return url

}

const getPostImagesUrl = async () => {

    const posterUrl = await getImageUrl(posterInput.files[0])
    const bannerUrl = await getImageUrl(bannerInput.files[0])

    return {
        posterUrl: posterUrl,
        bannerUrl: bannerUrl
    }

}

const setEditClassifications = async (classificationID) => {

    const classificationsJSON = await getClassifications()

    classificationsJSON.classificacoes.forEach((classification) => {
        const option = createClassificationOption(classification)
        if (classification.id == classificationID) {
            option.setAttribute('selected', true)
        }
        editClassificationInput.appendChild(option)
    })


}

const setEditMovie = (movie) => {

    editNameInput.value = movie.nome
    editSynopsisInput.value = movie.sinopse
    editDurationInput.value = movie.duracao
    editReleaseDateInput.value = movie.data_lancamento
    editPosterInput.previousElementSibling.src = movie.foto_capa
    editBannerInput.previousElementSibling.src = movie.foto_banner
    editFeaturedInput.checked = movie.destaque
    editTrailerInput.value = movie.link_trailer
    setEditClassifications(movie.id_classificacao)

}

const changeEditMovieImagePreview = async(input) => {

    const url = await getImageUrl(input.files[0])
    input.previousElementSibling.src = url

    if(input.id == 'edit-poster'){
        localStorage.setItem('editPosterUrl', url)
    }else{
        localStorage.setItem('editBannerUrl', url)
    }

}

const deleteMovieFun = () => {

    if (localStorage.getItem('editMovieFeatured') == 'true' || localStorage.getItem('editMovieFeatured') == '1') {

        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-secundary"> Filme em destaque <p>',
            html: '<p class="text-xl text-dark-gray"> Adicione destaque para outro filme antes de excluir esse <p>',
            icon: 'warning',
            iconColor: '#FD3131',
            showConfirmButton: false,
            width: '25rem',
            heightAuto: false
        })

    } else {

        const swalWithBootstrapButtons = Swal.mixin({

            customClass: {
                confirmButton: 'bg-secundary rounded-lg px-6 h-10 w-44 text-lg text-white max-md:text-base max-md:w-32',
                cancelButton: 'bg-main rounded-lg px-6 h-10 w-44 text-lg text-white mr-6 max-md:text-base max-md:w-32'
            },
            buttonsStyling: false,
            heightAuto: false

        })

        swalWithBootstrapButtons.fire({

            title: '<p class="text-2xl text-secundary font-poppins"> Tem certeza que deseja excluir esse filme? </p>',
            html: '<p class="text-dark_gray"> Essa ação não poderá ser desfeita </p>',
            icon: 'warning',
            iconColor: '#FD3131',
            showCancelButton: true,
            confirmButtonText: 'Excluir',
            cancelButtonText: 'Cancelar',
            width: '40%',
            padding: '0 0 28px 0',
            heightAuto: false,
            reverseButtons: true

        }).then(async (result) => {

            if (result.isConfirmed) {

                const rsDelete = await deleteMovie(localStorage.getItem('editMovieId'))
                closeEditMovieContainer()
                setMovies()

            }

        })

    }

}

const editInputValidation = async () => {

    let validation = false

    if (
        editNameInput.value == '' ||
        editSynopsisInput.value == '' ||
        editDurationInput.value == '' ||
        editReleaseDateInput.value == '' ||
        editClassificationInput.value == '' ||
        editTrailerInput.value == ''
    ) {

        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-secundary"> Preencha todas as informações corretamente <p>',
            icon: 'warning',
            iconColor: '#FD3131',
            showConfirmButton: false,
            width: '25rem',
            heightAuto: false
        })

    } else {

        validation = true

    }

    return validation

}

const updateMovieFun = async() => {
 
    if(editInputValidation()){

        let movie = {
            nome: editNameInput.value,
            sinopse: editSynopsisInput.value,
            duracao: editDurationInput.value,
            data_lancamento: editReleaseDateInput.value,
            destaque: editFeaturedInput.checked,
            link_trailer: editTrailerInput.value,
            id_classificacao: editClassificationInput.value
        }

        if(editPosterInput.files.length > 0){
            movie.foto_capa = localStorage.getItem('editPosterUrl')
        }else{
            movie.foto_capa = localStorage.getItem('editMoviePosterUrl')
        }

        if(editBannerInput.files.length > 0){
            movie.foto_banner = localStorage.getItem('editBannerUrl')
        }else{
            movie.foto_banner = localStorage.getItem('editMovieBannerUrl')
        }

        const rsUpdate = await updateMovie(movie, localStorage.getItem('editMovieId'))
        setMovies()

        Swal.fire({
            position: 'center',
            timer: 2000,
            title: '<p class="text-2xl text-dark_gray"> Filme atualizado com sucesso <p>',
            icon: 'success',
            iconColor: '#3064B4',
            showConfirmButton: false,
            width: '25rem',
            heightAuto: false
        })


    }

}

searchBar.addEventListener('keyup', async () => {

    const search = searchBar.value.toLowerCase()

    if (search != '') {
        const filteredMovies = await getMoviesByName(search)
        if (filteredMovies.status_code == 200) {
            createMovies(filteredMovies.filmes)
        }
    } else {
        setMovies()
    }

})

buttonCreateMovie.addEventListener('click', addPostMovieContainer)
buttonClosePostMovieContainer.addEventListener('click', closePostMovieContainer)
buttonCloseeditMovieContainer.addEventListener('click', closeEditMovieContainer)
buttonRegisterMovie.addEventListener('click', postMovieFun)
buttonDeleteMovie.addEventListener('click', deleteMovieFun)
editBannerInput.addEventListener('change', (e) => { changeEditMovieImagePreview(e.target) })
editPosterInput.addEventListener('change', (e) => { changeEditMovieImagePreview(e.target) })
buttonSaveEditMovie.addEventListener('click', updateMovieFun)

window.addEventListener('load', async () => {

    setMovies()

    const classificationsJSON = await getClassifications()
    setClassifications(classificationsJSON.classificacoes)

})
