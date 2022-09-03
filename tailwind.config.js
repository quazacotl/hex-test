/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'spray': '#FFDEE9',
      },
      backgroundImage: {
        'main-grad': "linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)",
        'nav-grad': "linear-gradient(to right, #11998e, #38ef7d)",
      },
      boxShadow: {
        'nav': '0 0 11px 7px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}

