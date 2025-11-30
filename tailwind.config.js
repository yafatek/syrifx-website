/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tajawal: ['Tajawal', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: "hsl(156 100% 20%)",
        },
        accent: {
          DEFAULT: "hsl(43 96% 56%)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
