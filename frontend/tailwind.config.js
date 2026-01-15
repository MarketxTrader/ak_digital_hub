/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a", // Navy
        accent: "#f59e0b",  // Gold
      }
    },
  },
  plugins: [],
}