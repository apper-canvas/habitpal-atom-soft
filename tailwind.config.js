/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED',
        secondary: '#EC4899',
        accent: '#10B981',
        surface: {
          50: '#FAF7FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95'
        },
        background: '#FAFAF9',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6'
      },
      fontFamily: {
        display: ['Fredoka One', 'cursive'],
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui'],
        body: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui']
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem'
      },
      borderRadius: {
        'pill': '999px'
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(124, 58, 237, 0.1)',
        'card': '0 4px 16px rgba(124, 58, 237, 0.08)',
        'button': '0 2px 12px rgba(124, 58, 237, 0.15)'
      }
    },
  },
  plugins: [],
}