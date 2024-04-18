'use strict'

// #region CLASSIFICATION

export const getClassification = async() => {

    try {
        const url = `http://localhost:8080/v2/acme_filmes/classificacoes`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

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

export const postClassification = async(classification) => {

    try {
        const url = `http://localhost:8080/v2/acme_filmes/classificacao`
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
        const url = `http://localhost:8080/v2/acme_filmes/classificacao/${id}`
        const options = {
            method: 'UPDATE',
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
        const url = `http://localhost:8080/v2/acme_filmes/classificacao/${id}`
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
        const url = `http://localhost:8080/v2/acme_filmes/filmes`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getFeaturedMovie = async() => {

    try {
        const url = `http://localhost:8080/v2/acme_filmes/filme/destaque`
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

export const postMovie = async(movie) => {

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

export const getActors = async() => {

    try {
        const url = `http://localhost:8080/v2/acme_filmes/atores`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

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
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }


}

export const postValidationUser = async(user) => {

    try {
        const url = `http://localhost:8080/v2/acme_filmes/validacao/usuario`
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

// #region PROFILE ICONS CATEGORY

export const getProfileIconsCategories = async() => {

    try {
        const url = `http://localhost:8080/v2/acme_filmes/categorias_foto_perfil`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getProfileIconCategoryById = async(id) => {

    try {
        const url = `http://localhost:8080/v2/acme_filmes/categoria_foto_perfil/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postProfileIconCategory = async(profileIconCategory) => {

    try {
        const url = `http://localhost:8080/v2/acme_filmes/categoria_foto_perfil`
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
        const url = `http://localhost:8080/v2/acme_filmes/categoria_foto_perfil/${id}`
        const options = {
            method: 'UPDATE',
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
        const url = `http://localhost:8080/v2/acme_filmes/categoria_foto_perfil/${id}`
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
        const url = `http://localhost:8080/v2/acme_filmes/fotos_perfil`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getProfileIconById = async(id) => {

    try {
        const url = `http://localhost:8080/v2/acme_filmes/foto_perfil/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getProfileIconByCategory = async(id) => {

    try {
        const url = `http://localhost:8080/v2/acme_filmes/foto_perfil/categoria/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getProfileIconsByCategories = async() => {

    try {
        const url = `http://localhost:8080/v2/acme_filmes/fotos_perfil/categorias/`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postProfileIcon = async(profileIcon) => {

    try {
        const url = `http://localhost:8080/v2/acme_filmes/foto_perfil`
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
        const url = `http://localhost:8080/v2/acme_filmes/foto_perfil/${id}`
        const options = {
            method: 'UPDATE',
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
        const url = `http://localhost:8080/v2/acme_filmes/foto_perfil/${id}`
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
        const url = `http://localhost:8080/v2/acme_filmes/perfis`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getProfileById = async(id) => {

    try {
        const url = `http://localhost:8080/v2/acme_filmes/perfil/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getProfilesByUser = async(id) => {

    try {
        const url = `http://localhost:8080/v2/acme_filmes/perfis/usuario/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postProfile = async(profile) => {

    try {
        const url = `http://localhost:8080/v2/acme_filmes/perfil`
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
        const url = `http://localhost:8080/v2/acme_filmes/perfil/${id}`
        const options = {
            method: 'UPDATE',
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
        const url = `http://localhost:8080/v2/acme_filmes/perfil/${id}`
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
        const url = `http://localhost:8080/v2/acme_filmes/funcionarios`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postValidationEmployee = async(employee) => {

    try {
        
        const url = `http://localhost:8080/v2/acme_filmes/validacao/usuario`
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