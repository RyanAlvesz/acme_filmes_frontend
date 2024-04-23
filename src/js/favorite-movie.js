'use strict'

import { postFavoriteMovie, getFavoriteMovies } from './functions.js'

export const postFavoriteProfileMovie = async(idProfile, idMovie) => {

    const favoriteMovie = {
        id_filme: idMovie,
        id_perfil: idProfile
    }

    const rsPost = await postFavoriteMovie(favoriteMovie)
    localStorage.setItem('favoriteMovieId', rsPost.filme_favorito.id)

}

export const validationFavoriteMovie = async(profileId, movieId) => {

    const favoriteMovies = await getFavoriteMovies()
    let validation = false

    favoriteMovies.filmes_favoritos.forEach((favoriteMovie)=>{

        if(favoriteMovie.id_perfil == profileId && favoriteMovie.id_filme == movieId){
            
            localStorage.setItem('favoriteMovieId', favoriteMovie.id)
            validation = true

        }

    })

    if(validation)
        return true
    else
        return false

}