export const createMoviesCard = (movie, size) => {

    const button = document.createElement('button')
    button.classList.add(size.h, size.w, 'flex-shrink-0', 'rounded-md', 'overflow-hidden')

    button.addEventListener('click', () => {localStorage.setItem('movieId', movie.id)})

    const a = document.createElement('a')
    a.href = './movie-info.html'
    a.classList.add('flex', 'h-full', 'w-full')

    const img = document.createElement('img')
    img.classList.add('w-full', 'h-full', 'object-cover', 'hover:scale-110', 'ease-linear', 'duration-700')
    img.src = movie.foto_capa
    img.alt = movie.nome

    button.append(a)
    a.append(img)

    return button

}