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
      }
    },
  },
  plugins: [],
}

