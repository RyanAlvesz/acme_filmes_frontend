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

export const postFilme = async(filme) => {

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
}
