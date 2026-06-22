import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/context/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '360px',
      },
      colors: {
        primary: {
          DEFAULT: '#0B6E4F',
          hover: '#095C42',
          50: '#EBF5F1',
          100: '#D2E9E0',
          200: '#A6D3C1',
          300: '#79BDA2',
          400: '#4DA783',
          500: '#0B6E4F',
          600: '#095C42',
          700: '#074A35',
          800: '#053828',
          900: '#06281D',
        },
        gold: {
          DEFAULT: '#C9A227',
          light: '#E5C75D',
          soft: '#F5ECD3',
          dark: '#A5851C',
        },
        ivory: '#FAF8F3',
        'dark-emerald': '#06281D',
        heading: '#1A2E26',
        body: '#5B6B63',
        'card-border': '#E8E4DA',
        success: '#16A34A',
        warning: '#D97706',
        danger: '#DC2626',
        info: '#2563EB',
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-amiri)', 'serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(11, 110, 79, 0.06), 0 4px 12px rgba(11, 110, 79, 0.04)',
        'card-hover': '0 8px 30px rgba(11, 110, 79, 0.14), 0 2px 8px rgba(11, 110, 79, 0.08)',
        gold: '0 8px 30px rgba(201, 162, 39, 0.22)',
        glow: '0 0 40px rgba(201, 162, 39, 0.25)',
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(135deg, rgba(6,40,29,0.92) 0%, rgba(11,110,79,0.72) 55%, rgba(6,40,29,0.85) 100%)',
        'emerald-gradient': 'linear-gradient(135deg, #06281D 0%, #0B6E4F 60%, #0E8560 100%)',
        'gold-gradient': 'linear-gradient(135deg, #C9A227 0%, #E5C75D 50%, #C9A227 100%)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-700px 0' },
          '100%': { backgroundPosition: '700px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.8s linear infinite',
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
