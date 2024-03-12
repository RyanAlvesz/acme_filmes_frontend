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
        'secundary': '#3064B4',
        'dark_gray': '#141414',
        'medium_gray': '#333333',
        'gray': '#9d9d9d'
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
        'kill-bill': "url('../images/background.png')",
      },
    },
  },
  plugins: [],
}

