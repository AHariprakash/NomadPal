/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tribal: ['"Papyrus"', 'serif'],
        gamer: ['"Press Start 2P"', 'monospace'], // optional pixel-style font
      },
      colors: {
        // Consolidated custom colors
        jungle: '#008060',     // Primary dark green
        fire: '#ff5e3a',       // Bright fire-orange
        sand: '#f4e2d8',       // Background / secondary light beige
        neon: '#39ff14',       // Futuristic bright green (gaming mode)
      },
    },
  },
  plugins: [],
};
