'use strict'

const apiUrl = 'https://acme-filmes-backend-1qiz.onrender.com'

// #region CLASSIFICATION

export const getClassifications = async() => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/classificacoes`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getClassificationById = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/classificacao/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postClassification = async(classification) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/classificacao`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sigla: classification.sigla,
                descricao: classification.descricao,
                classificacao_indicativa: classification.classificacao_indicativa,
                icone: classification.icone
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateClassification = async(classification, id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/classificacao/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sigla: classification.sigla,
                descricao: classification.descricao,
                classificacao_indicativa: classification.classificacao_indicativa,
                icone: classification.icone
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const deleteClassification = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/classificacao/${id}`
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

// #region MOVIES

export const getMovies = async() => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filmes`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getFeaturedMovie = async() => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/destaque`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getMoviesByName = async(name) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filmes/filtro?nome=${name}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getMovieById = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filme/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getMoviesByActor = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filmes/ator/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getMoviesByGenre = async() => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filmes/generos/`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getFavoriteMoviesProfile = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filmes/perfil/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postMovie = async(movie) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filme`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: movie.nome,
                sinopse: movie.sinopse,
                duracao: movie.duracao,
                data_lancamento: movie.data_lancamento,
                foto_capa: movie.foto_capa,
                foto_banner: movie.foto_banner,
                destaque: movie.destaque,
                link_trailer: movie.link_trailer,
                id_classificacao: movie.id_classificacao
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data       
    } catch (error) {
        return false
    }
}

export const updateMovie = async(movie, id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filme/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: movie.nome,
                sinopse: movie.sinopse,
                duracao: movie.duracao,
                data_lancamento: movie.data_lancamento,
                foto_capa: movie.foto_capa,
                foto_banner: movie.foto_banner,
                destaque: movie.destaque,
                link_trailer: movie.link_trailer,
                id_classificacao: movie.id_classificacao
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateAddFeaturedMovie = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/add_destaque/${id}`
        const options = {
            method: 'PUT'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const deleteMovie = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filme/${id}`
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

// #region DIRECTOR

export const getDirectors = async() => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/diretores`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getDirectorById = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/diretor/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getDirectorByMovieId = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/diretores/filme/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postDirector = async(director) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/diretor`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: director.nome
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateDirector = async(director, id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/diretor/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: director.nome
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const deleteDirector = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/diretor/${id}`
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

// #region DIRECTORS MOVIES

export const getDirectorsMovies = async() => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filmes_diretores`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getDirectorMovieById = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filme_diretor/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postDirectorMovie = async(directorMovie) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filme_diretor`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_filme: directorMovie.id_filme,
                id_diretor: directorMovie.id_diretor
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateDirectorMovie = async(directorMovie, id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filme_diretor/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_filme: directorMovie.id_filme,
                id_diretor: directorMovie.id_diretor
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const deleteDirectorMovie = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filme_diretor/${id}`
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

// #region GENRES

export const getGenres = async() => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/generos`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getGenreById = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/genero/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postGenre = async(genre) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/genero`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: genre.nome
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateGenre = async(genre, id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/genero/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: genre.nome
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const deleteGenre = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/genero/${id}`
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

// #region MOVIES GENRES

export const getMoviesGenres = async() => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filmes_generos`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getMovieGenreById = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filme_genero/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postMovieGenre = async(movieGenre) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filme_genero`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_filme: movieGenre.id_filme,
                id_genero: movieGenre.id_genero
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateMovieGenre = async(movieGenre, id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filme_genero/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_filme: movieGenre.id_filme,
                id_genero: movieGenre.id_genero
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const deleteMovieGenre = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filme_genero/${id}`
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

// #region NATIONALITY

export const getNationalities = async() => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/nacionalidades`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getNationalityById = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/nacionalidade/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postNationality = async(nationality) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/nacionalidade`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pais: nationality.pais,
                nome: nationality.nome,
                bandeira: nationality.bandeira
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateNationality = async(nationality, id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/nacionalidade/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pais: nationality.pais,
                nome: nationality.nome,
                bandeira: nationality.bandeira
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const deleteNationality = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/nacionalidade/${id}`
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

// #region ACTOR

export const getActors = async() => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/atores`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getActorById = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/ator/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getActorMoviesById = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/atores/filme/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postActor = async(actor) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/ator`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: actor.nome,
                foto: actor.foto,
                biografia: actor.biografia,
                data_nascimento: actor.data_nascimento,
                data_falecimento: actor.data_falecimento
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateActor = async(actor, id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/ator/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: actor.nome,
                foto: actor.foto,
                biografia: actor.biografia,
                data_nascimento: actor.data_nascimento,
                data_falecimento: actor.data_falecimento
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const deleteActor = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/ator/${id}`
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

// #region ACTORS MOVIES

export const getActorsMovies = async() => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filmes_atores/`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getActorMovieById = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filme_ator/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postActorMovie = async(actorMovie) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filme_ator`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_filme: actorMovie.id_filme,
                id_ator: actorMovie.id_ator
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateActorMovie = async(actorMovie, id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filme_ator/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_filme: actorMovie.id_filme,
                id_ator: actorMovie.id_ator
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const deleteActorMovie = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filme_ator/${id}`
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

// #region ACTORS NATIONALITY

export const getActorsNationalities = async() => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/nacionalidades_atores/`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getActorNationalityById = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/nacionalidade_ator/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postActorNationality = async(actorNationality) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/nacionalidade_ator`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_nacionalidade: actorNationality.id_nacionalidade,
                id_ator: actorNationality.id_ator
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateActorNationality = async(actorNationality, id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/nacionalidade_ator/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_nacionalidade: actorNationality.id_nacionalidade,
                id_ator: actorNationality.id_ator
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const deleteActorNationality = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/nacionalidade_ator/${id}`
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

// #region USERS

export const getUsers = async() => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/usuarios/`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getUserById = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/usuario/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postValidationUser = async(user) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/validacao/usuario`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: user.email,
                senha: user.senha
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
        
    } catch (error) {
        return false
    }

}

export const postUser = async(user) => {

    try{
        const url = `${apiUrl}/v2/acme_filmes/usuario/`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: user.nome,
                email: user.email,
                senha: user.senha
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }


}

export const updateUser = async(user, id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/usuario/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: user.nome,
                email: user.email
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateUserPassword = async(user, id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/senha/usuario/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: user.nome,
                email: user.email,
                senha: user.senha
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const deleteUser = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/usuario/${id}`
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

// #region PROFILE ICONS CATEGORY

export const getProfileIconsCategories = async() => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/categorias_foto_perfil`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getProfileIconCategoryById = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/categoria_foto_perfil/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postProfileIconCategory = async(profileIconCategory) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/categoria_foto_perfil`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: profileIconCategory.nome
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateProfileIconCategory = async(profileIconCategory, id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/categoria_foto_perfil/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: profileIconCategory.nome
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const deleteProfileIconCategory = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/categoria_foto_perfil/${id}`
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

// #region PROFILE ICONS

export const getProfileIcons = async() => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/fotos_perfil`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getProfileIconById = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/foto_perfil/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getProfileIconByCategory = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/foto_perfil/categoria/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getProfileIconsByCategories = async() => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/fotos_perfil/categorias/`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postProfileIcon = async(profileIcon) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/foto_perfil`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                foto: profileIcon.foto,
                nome: profileIcon.nome,
                id_categoria_foto_perfil: profileIcon.id_categoria_foto_perfil
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateProfileIcon = async(profileIcon, id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/foto_perfil/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                foto: profileIcon.foto,
                nome: profileIcon.nome,
                id_categoria_foto_perfil: profileIcon.id_categoria_foto_perfil
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const deleteProfileIcon = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/foto_perfil/${id}`
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

// #region PROFILE

export const getProfiles = async() => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/perfis`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getProfileById = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/perfil/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getProfilesByUser = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/perfis/usuario/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postProfile = async(profile) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/perfil`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                apelido: profile.apelido,
                id_usuario: profile.id_usuario,
                id_foto_perfil: profile.id_foto_perfil
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateProfile = async(profile, id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/perfil/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                apelido: profile.apelido,
                id_usuario: profile.id_usuario,
                id_foto_perfil: profile.id_foto_perfil
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const deleteProfile = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/perfil/${id}`
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

// #region FAVORITE MOVIES

export const getFavoriteMovies = async() => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filmes_favoritos`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getFavoriteMovieById = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filme_favorito/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postFavoriteMovie = async(favoriteMovie) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filme_favorito`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_filme: favoriteMovie.id_filme,
                id_perfil: favoriteMovie.id_perfil
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateFavoriteMovie = async(favoriteMovie, id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filme_favorito/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_filme: favoriteMovie.id_filme,
                id_perfil: favoriteMovie.id_perfil
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const deleteFavoriteMovie = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/filme_favorito/${id}`
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

// #region EMPLOYEES

export const getEmployees = async() => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/funcionarios`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getEmployeeById = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/funcionario/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postValidationEmployee = async(employee) => {

    try {
        
        const url = `${apiUrl}/v2/acme_filmes/validacao/funcionario`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: employee.email,
                senha: employee.senha
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
        
    } catch (error) {
        return false
    }

}

export const postEmployee = async(employee) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/funcionario`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: employee.nome,
                email: employee.email,
                senha: employee.senha
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateEmployeePassword = async(employee, id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/senha/funcionario/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: employee.nome,
                email: employee.email,
                senha: employee.senha
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateEmployee = async(employee, id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/funcionario/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: employee.nome,
                email: employee.email
            })
        }
        const response = await fetch(url, options)
        console.log(response);
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const deleteEmployee = async(id) => {

    try {
        const url = `${apiUrl}/v2/acme_filmes/funcionario/${id}`
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}