/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "section": "#F4F5F6",
        "line": "#E7E9EE",
        "text": "#495365",
        "hovered": "#F4F5F6",
        "selected": "#EFF6FF"
      }
    },
  },
  plugins: [],
}
