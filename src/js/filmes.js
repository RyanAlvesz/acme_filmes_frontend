'use strict'

export const getFilmes = async() => {

    const url = 'http://localhost:8080/v2/acme_filmes/filmes'
    const response = await fetch(url)
    const data = await response.json()
    return data.filmes

}

export const getFilmeById = async(id) => {

    const url = `http://localhost:8080/v2/acme_filmes/filme/${id}`
    const response = await fetch(url)
    const data = await response.json()
    return data.filmes[0]

}
