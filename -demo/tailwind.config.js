/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-primary': '#00ff88',
        'neon-secondary': '#00f0ff',
        'neon-danger': '#ff0040',
        'bg-dark': '#050505',
        'bg-dark-secondary': '#0a0a0a',
      },
      fontFamily: {
        'display': ['Orbitron', 'sans-serif'],
        'mono': ['Share Tech Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}
