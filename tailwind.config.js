/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0a0a0a',
        'dark-card': '#121212',
        'dark-accent': '#1e1e1e',
        'neon-blue': '#00eeff',
        'neon-purple': '#9d4edd',
        'neon-pink': '#ff00ff',
        'glass-bg': 'rgba(18, 18, 18, 0.7)'
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'typing': 'typing 3.5s steps(40, end), blink-caret .75s step-end infinite',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 5px #00eeff, 0 0 10px #00eeff' },
          '100%': { textShadow: '0 0 10px #00eeff, 0 0 20px #00eeff, 0 0 30px #00eeff' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'blink-caret': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#00eeff' },
        },
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
    },
  },
  plugins: [],
};