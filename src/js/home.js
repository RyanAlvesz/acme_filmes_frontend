'use strict'

// Montagem de itens

let moviesJSON = {

    generos: [
        {
            id: 1,
            nome: 'Drama',
            filmes: [
                {
                    id: 1,
                    nome: 'Barbie',
                    poster: 'barbie'
                },
                {
                    id: 2,
                    nome: 'Pobres Criaturas',
                    poster: 'poor-things'
                },
                {
                    id: 3,
                    nome: 'Adoráveis Mulheres',
                    poster: 'little-women'
                },
                {
                    id: 4,
                    nome: 'Oppenheimer',
                    poster: 'oppenheimer'
                },
                {
                    id: 5,
                    nome: 'Bastardos Inglórios',
                    poster: 'inglorious-bastards'
                },
                {
                    id: 6,
                    nome: 'Pearl',
                    poster: 'pearl'
                },
                {
                    id: 7,
                    nome: 'Harry Potter e as Relíquias da Morte parte 2 ',
                    poster: 'harry-potter'
                },
                {
                    id: 8,
                    nome: 'Jogos Vorazes em Chamas',
                    poster: 'hunger-games'
                },
                {
                    id: 1,
                    nome: 'Barbie',
                    poster: 'barbie'
                },
                {
                    id: 2,
                    nome: 'Pobres Criaturas',
                    poster: 'poor-things'
                },
                {
                    id: 3,
                    nome: 'Adoráveis Mulheres',
                    poster: 'little-women'
                },
                {
                    id: 4,
                    nome: 'Oppenheimer',
                    poster: 'oppenheimer'
                },
                {
                    id: 5,
                    nome: 'Bastardos Inglórios',
                    poster: 'inglorious-bastards'
                },
                {
                    id: 6,
                    nome: 'Pearl',
                    poster: 'pearl'
                },
                {
                    id: 7,
                    nome: 'Harry Potter e as Relíquias da Morte parte 2 ',
                    poster: 'harry-potter'
                },
                {
                    id: 8,
                    nome: 'Jogos Vorazes em Chamas',
                    poster: 'hunger-games'
                }
            ]
        },
        {
            id: 2,
            nome: 'Romance',
            filmes: [
                {
                    id: 1,
                    nome: 'Barbie',
                    poster: 'barbie'
                },
                {
                    id: 2,
                    nome: 'Pobres Criaturas',
                    poster: 'poor-things'
                },
                {
                    id: 3,
                    nome: 'Adoráveis Mulheres',
                    poster: 'little-women'
                },
                {
                    id: 4,
                    nome: 'Oppenheimer',
                    poster: 'oppenheimer'
                },
                {
                    id: 5,
                    nome: 'Bastardos Inglórios',
                    poster: 'inglorious-bastards'
                },
                {
                    id: 6,
                    nome: 'Pearl',
                    poster: 'pearl'
                },
                {
                    id: 7,
                    nome: 'Harry Potter e as Relíquias da Morte parte 2 ',
                    poster: 'harry-potter'
                },
                {
                    id: 8,
                    nome: 'Jogos Vorazes em Chamas',
                    poster: 'hunger-games'
                },
                {
                    id: 1,
                    nome: 'Barbie',
                    poster: 'barbie'
                },
                {
                    id: 2,
                    nome: 'Pobres Criaturas',
                    poster: 'poor-things'
                },
                {
                    id: 3,
                    nome: 'Adoráveis Mulheres',
                    poster: 'little-women'
                },
                {
                    id: 4,
                    nome: 'Oppenheimer',
                    poster: 'oppenheimer'
                },
                {
                    id: 5,
                    nome: 'Bastardos Inglórios',
                    poster: 'inglorious-bastards'
                },
                {
                    id: 6,
                    nome: 'Pearl',
                    poster: 'pearl'
                },
                {
                    id: 7,
                    nome: 'Harry Potter e as Relíquias da Morte parte 2 ',
                    poster: 'harry-potter'
                },
                {
                    id: 8,
                    nome: 'Jogos Vorazes em Chamas',
                    poster: 'hunger-games'
                }
            ]
        },
        {
            id: 3,
            nome: 'Ação',
            filmes: [
                {
                    id: 1,
                    nome: 'Barbie',
                    poster: 'barbie'
                },
                {
                    id: 2,
                    nome: 'Pobres Criaturas',
                    poster: 'poor-things'
                },
                {
                    id: 3,
                    nome: 'Adoráveis Mulheres',
                    poster: 'little-women'
                },
                {
                    id: 4,
                    nome: 'Oppenheimer',
                    poster: 'oppenheimer'
                },
                {
                    id: 5,
                    nome: 'Bastardos Inglórios',
                    poster: 'inglorious-bastards'
                },
                {
                    id: 6,
                    nome: 'Pearl',
                    poster: 'pearl'
                },
                {
                    id: 7,
                    nome: 'Harry Potter e as Relíquias da Morte parte 2 ',
                    poster: 'harry-potter'
                },
                {
                    id: 8,
                    nome: 'Jogos Vorazes em Chamas',
                    poster: 'hunger-games'
                },
                {
                    id: 1,
                    nome: 'Barbie',
                    poster: 'barbie'
                },
                {
                    id: 2,
                    nome: 'Pobres Criaturas',
                    poster: 'poor-things'
                },
                {
                    id: 3,
                    nome: 'Adoráveis Mulheres',
                    poster: 'little-women'
                },
                {
                    id: 4,
                    nome: 'Oppenheimer',
                    poster: 'oppenheimer'
                },
                {
                    id: 5,
                    nome: 'Bastardos Inglórios',
                    poster: 'inglorious-bastards'
                },
                {
                    id: 6,
                    nome: 'Pearl',
                    poster: 'pearl'
                },
                {
                    id: 7,
                    nome: 'Harry Potter e as Relíquias da Morte parte 2 ',
                    poster: 'harry-potter'
                },
                {
                    id: 8,
                    nome: 'Jogos Vorazes em Chamas',
                    poster: 'hunger-games'
                }
            ]
        }
    ]
}

const createMoviesSection = (genre) => {

    const section = document.createElement('section')
    section.classList.add('flex', 'flex-col', 'gap-4', 'pb-8', 'h-[40vh]', 'movies-container', 'relative')


    const h2 = document.createElement('h2')
    h2.classList.add('font-semibold', 'text-white', 'text-3xl')
    h2.textContent = genre.nome.toUpperCase()

    const arrowPrev = document.createElement('button')
    arrowPrev.classList.add('arrow', 'h-[15vh]', 'w-10', '-top-[calc(5vh-50%)]', '-translate-x-full', 'absolute', 'left-0', 'items-center', 'justify-center')
    
    const arrowImgPrev = document.createElement('img')
    arrowImgPrev.classList.add('h-full', 'w-full')
    arrowImgPrev.src = '../images/svg/arrow-prev.svg'
    arrowImgPrev.alt = 'Seta para esquerda'

    let scrollPrev = -350

    arrowPrev.addEventListener('click', () => {
        moviesContainer.scroll({
            top: 0,
            left: scrollPrev,
            behavior: 'smooth'
        })
        scrollPrev -= 350;
    })

    arrowPrev.appendChild(arrowImgPrev)
    
    const arrowNext = document.createElement('button')
    arrowNext.classList.add('arrow', 'h-[15vh]', 'w-10', 'right-0', '-top-[calc(5vh-50%)]', 'translate-x-full', 'absolute', 'items-center', 'justify-center')
    
    const arrowImgNext = document.createElement('img')
    arrowImgNext.classList.add('h-full', 'w-full')
    arrowImgNext.src = '../images/svg/arrow-next.svg'
    arrowImgNext.alt = 'Seta para direita'

    let scrollNext = 350

    
    arrowNext.addEventListener('click', () => {
        moviesContainer.scroll({
            top: 0,
            right: scrollNext,
            behavior: 'smooth'
        })
        scrollNext += 350
    })
    
    arrowNext.appendChild(arrowImgNext)
    
    const moviesContainer = document.createElement('div')
    moviesContainer.classList.add('h-full', 'flex', 'gap-6', 'w-[calc(100vw-7rem)]', 'overflow-x-scroll', 'overflow-y-hidden', 'place-self-center')
    
    genre.filmes.forEach(movie => {
        
        const button = createMoviesButton(movie)
        moviesContainer.appendChild(button)

    });

    section.replaceChildren(h2, arrowPrev, moviesContainer, arrowNext)

    return section

}

const createMoviesButton = (movie) => {

    const button = document.createElement('button')
    button.classList.add('h-full', 'w-[12rem]', 'flex-shrink-0', `bg-${movie.poster}`, 'rounded-md', 'bg-cover', 'bg-center')

    button.addEventListener('click', () => {localStorage.setItem('movieId', movie.id)})

    const a = document.createElement('a')
    a.href = './movie-info.html'
    a.classList.add('inline-block', 'h-full', 'w-full')

    button.append(a)

    return button

}

const addMovies = (moviesJSON) => {

    const main = document.getElementById('main')

    moviesJSON.generos.forEach(genre => {

        let movieSection = createMoviesSection(genre)
        main.appendChild(movieSection)

    })

}

window.addEventListener('load', addMovies(moviesJSON))

