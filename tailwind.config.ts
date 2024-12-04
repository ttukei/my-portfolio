const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [...fontFamily.sans], // Default sans stack
        dotgothic: ['DotGothic16', 'sans-serif'], // Add DotGothic16
      },
    },
  },
  plugins: [],
};