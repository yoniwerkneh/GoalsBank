/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#9C27B0', // Purple
          400: '#AB47BC',
          300: '#BA68C8',
          200: '#CE93D8',
        },
        accent: {
          500: '#FF8A80', // Light Red
          400: '#FF9E9E',
          300: '#FFB3B3',
          200: '#FFC7C7',
        },
        dark: {
          900: '#0A0A0A',
          800: '#121212',
          700: '#1A1A1A',
          600: '#242424',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-left': 'slideLeft 0.8s ease-out',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}