import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      screens: {
        xl: '1240px',
      },
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    extend: {
      animation: {
        pop: 'pop 0.5s cubic-bezier(.26, .53, .74, 1.48)',
      },
      colors: {
        primary: {
          light: '#e2e8f0', // slate-200
          DEFAULT: '#64748b', //slate-500
          dark: '#1e293b', // slate-800
        },
        secondary: {
          light: '#fde68a', // amber-200
          DEFAULT: '#f59e0b', // amber-500
          dark: '#92400e', // amber-800
        },
      },
      keyframes: {
        pop: {
          '0%': { opacity: '0', transform: 'scale(0.8, 0.8)' },
          '100%': { opacity: '1', transform: 'scale(1, 1)' },
        },
      },
      width: {
        96: '96%',
      },
    },
  },
  plugins: [],
};
export default config;
