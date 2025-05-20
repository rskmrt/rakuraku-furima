/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mercari: {
          red: '#FF0211',
          darkRed: '#D10012',
          lightRed: '#FF4D5A',
          lightGray: '#F5F5F5',
          mediumGray: '#CCCCCC',
          darkGray: '#666666',
          black: '#333333',
        },
        success: {
          light: '#E3FCEF',
          DEFAULT: '#10B981',
          dark: '#065F46',
        },
        warning: {
          light: '#FFFBEB',
          DEFAULT: '#F59E0B',
          dark: '#92400E',
        },
        error: {
          light: '#FEF2F2',
          DEFAULT: '#EF4444',
          dark: '#B91C1C',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};