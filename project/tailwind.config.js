/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B2A43",
          deep: "#081D30",
          light: "#123B5C",
        },
        teal: {
          DEFAULT: "#0B8F95",
          bright: "#14A8AE",
          soft: "#DCF1F1",
        },
        sand: {
          DEFAULT: "#C9A24B",
          light: "#E4CD8F",
        },
        mist: "#F6FBFB",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        sans: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
}
