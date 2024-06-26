/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {      
      fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      },
    },
    colors: {
      'white' : '#FFFFFF',
      'cyan' : '#ecfeff',
      'skyblue' : '#0ea5e9'
    },
  },
  plugins: [],
}

