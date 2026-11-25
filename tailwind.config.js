/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        graphite: {
          // Centralized design tokens for the Graphite Dark theme.
          bg: '#111317',
          section: '#171A20',
          card: '#1E2229',
          border: '#303640',
        },
        content: {
          primary: '#F1F3F5',
          secondary: '#A4ABB6',
        },
        bronze: {
          DEFAULT: '#C5A36B',
          hover: '#D4B57D',
          muted: '#A88A55',
        },
        success: '#4CB782',
        warning: '#E5B45E',
        error: '#E57373',
      },
      fontFamily: {
        sans: [
          'Inter',
          'Segoe UI',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
      },
      maxWidth: {
        container: '1280px',
      },
      spacing: {
        18: '4.5rem',
      },
      borderRadius: {
        DEFAULT: '6px',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'contour-drift': {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-40px, 0, 0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.4s ease-out both',
        'contour-drift': 'contour-drift 60s linear infinite',
      },
    },
  },
  plugins: [],
};
