/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      transform: {
        "rotate-y-180": "rotateY(180deg)",
      },
    },
  },
  plugins: [],
}

