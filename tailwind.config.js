/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        'rose': {
          50: '#fff9fb',
          100: '#ffeef2',
          200: '#ffd4e2',
          300: '#ffb8d0',
          400: '#ff8ab0',
          500: '#ff6b9d', // main brand color
          600: '#ff4d7d',
          700: '#e03a6d',
          800: '#c12a5d',
          900: '#9b1b4d',
        },
        'purple': {
          500: '#9c89ff',
          600: '#7c6ae8',
        },
        // Semantic colors
        'success': '#06d6a0',
        'warning': '#ffd166',
        'error': '#ef476f',
        'info': '#118ab2',
      },
      fontFamily: {
        'heading': ['Poppins', 'sans-serif'],
        'body': ['Nunito Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}