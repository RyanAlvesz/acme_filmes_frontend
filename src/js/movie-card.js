export const createMoviesCard = (movie, size, hover) => {

    const button = document.createElement('button')
    button.classList.add(size.h, size.w, 'flex-shrink-0', `bg-${movie.poster}`, 'rounded-md', 'bg-cover', 'bg-center', 'ease-linear', 'duration-300')

    button.addEventListener('click', () => {localStorage.setItem('movieId', movie.id)})

    const a = document.createElement('a')
    a.href = './movie-info.html'
    a.classList.add('inline-block', 'h-full', 'w-full')

    button.append(a)

    if(hover){
        button.classList.add('hover:-translate-y-[0.5rem]')
    }


    return button

}