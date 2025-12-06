/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        galaxy: {
          bg: '#0A0A1A',
          card: '#1A1A2E',
          accent: '#2D2D44',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F4DF4E',
          dark: '#AA8C2C',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A0A0B0',
          tertiary: '#666677',
        }
      }
    },
  },
  plugins: [],
}

