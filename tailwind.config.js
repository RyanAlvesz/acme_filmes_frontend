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
        'standard': "url('../images/icons/standard.jpg')",
        'speak-now': "url('../images/icons/taylor/speak-now.jpg')",
        'red': "url('../images/icons/taylor/red.jpg')",
        '1989': "url('../images/icons/taylor/1989.jpg')",
        'reputation': "url('../images/icons/taylor/reputation.jpg')",
        'lover': "url('../images/icons/taylor/lover.jpg')",
        'folklore': "url('../images/icons/taylor/folklore.jpg')",
        'evermore': "url('../images/icons/taylor/evermore.jpg')",
        'midnights': "url('../images/icons/taylor/midnights.jpg')",
        'barbie': "url('../images/icons/movies/barbie.png')",
        'harry-potter': "url('../images/icons/movies/harry-potter.png')",
        'hunger-games': "url('../images/icons/movies/hunger-games.png')",
        'inglorious-bastards': "url('../images/icons/movies/inglorious-bastards.png')",
        'little-women': "url('../images/icons/movies/little-women.png')",
        'oppenheimer': "url('../images/icons/movies/oppenheimer.png')",
        'pearl': "url('../images/icons/movies/pearl.png')",
        'poor-things': "url('../images/icons/movies/poor-things.png')",
        'kill-bill': "url('../images/background.png')",
        'movies': "url('../images/movies-bg.jpg')",
        'barbie-banner': "url('../images/barbie-banner.png')",
      },
    },
  },
  plugins: [],
}

