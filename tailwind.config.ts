import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '8px',
        md: '8px',
        sm: '8px',
      },
      colors: {
        'brand-orange': '#FF8310',
        'brand-dark-bg': '#191A20',
        'brand-card-bg': '#232323',
        'brand-gray-dark': '#393939',
        'brand-gray-medium': '#CCCCCC',
        'brand-gray-light': '#FFFFFF',
      },
    },
  },
};

export default config;
