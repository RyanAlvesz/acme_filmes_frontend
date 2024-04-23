/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'poppins':  ["Poppins", 'sans-serif']
      },
      colors: {
        'main': '#FF0000',
        'main-soft': '#FD3131',
        'secundary': '#3064B4',
        'purple': '#994a71',
        'dark_gray': '#141414',
        'medium_gray': '#333333',
        'gray': '#9D9D9D',
        'light-gray': '#E6E6E6',
        'gray-shadow': '#373737',
        'gray-header': '#121212',
        'cold-gray': '#333333'
      },
      backgroundImage: {
        'movies': "url('../images/movies-bg.jpg')"
      },
    },
  },
  plugins: [],
}

