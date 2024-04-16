'use strict'

// #region CLASSIFICATION

export const getClassificationById = async(id) => {

    try {
        const url = `http://localhost:8080/v2/acme_filmes/classificacao/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

// #region MOVIES

export const getMovies = async() => {

    try {
        const url = `http://localhost:8080/v2/acme_filmes/filmes`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getMovieById = async(id) => {

    try {
        const url = `http://localhost:8080/v2/acme_filmes/filme/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postMovie = async(filme) => {

    try {
        const url = `http://localhost:8080/v2/acme_filmes/filme`
        const options = {
            method: 'POST',
            headers: {
                'Contety-Type': 'application/json'
            },
            body: JSON.stringify(filme)
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data       
    } catch (error) {
        return false
    }
}

export const getMoviesByActor = async(id) => {

    try {
        const url = `http://localhost:8080/v2/acme_filmes/filmes/ator/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getMoviesByGenre = async() => {

    try {
        const url = `http://localhost:8080/v2/acme_filmes/filmes/generos/`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getFavoriteMovies = async(id) => {

    try {
        const url = `http://localhost:8080/v2/acme_filmes/filmes/perfil/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

// #region NATIONALITY

export const getNationalityById = async(id) => {

    try {
        const url = `http://localhost:8080/v2/acme_filmes/nacionalidade/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

// #region ACTOR

export const getActorById = async(id) => {

    try {
        const url = `http://localhost:8080/v2/acme_filmes/ator/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

// #region ACTORS NATIONALITY

export const getActorsNationalities = async() => {

    try {
        const url = `http://localhost:8080/v2/acme_filmes/nacionalidades_atores/`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}


// #region USERS

export const getUsers = async() => {

    try {
        const url = `http://localhost:8080/v2/acme_filmes/usuarios/`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postUser = async(user) => {

    try{
        const url = `http://localhost:8080/v2/acme_filmes/usuario/`
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
        const response = fetch(url, options)
        const data = response.json()
        return data
    } catch (error) {
        return false
    }


}

// #region EMPLOYEES

export const getEmployees = async() => {

    try {
        const url = `http://localhost:8080/v2/acme_filmes/funcionarios`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}