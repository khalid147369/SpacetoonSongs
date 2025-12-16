/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/components/**/*.{vue,js,ts,jsx,tsx}",
    "./app/layouts/**/*.{vue,js,ts,jsx,tsx}",
    "./app/pages/**/*.{vue,js,ts,jsx,tsx}",
    "./app/app.vue",
  ],
  theme: {
    extend: {
      colors: {
        'deep-black': '#121212',
        'dark-gray': '#1E1E1E',
        'medium-gray': '#A0A0A0',
        'vibrant-purple': '#7C4DFF',
        'light-gray-border': '#333333',
      },
    },
  },
  plugins: [],
}
