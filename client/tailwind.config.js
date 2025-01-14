/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        zinc: {
          950: "#181818",
          900: "#272727",
        },
      },
    },
  },
  plugins: [],
};
