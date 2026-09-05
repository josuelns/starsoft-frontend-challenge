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
        'brand-dark-bg': '#232323',
        'brand-card-bg': '#191A20',
        'brand-cart-item-bg': '#2B2B2B',
        'brand-card-image-bg': '#393939',
        'brand-gray-dark': '#393939',
        'brand-buy-bg': '#494949',
        'brand-gray-medium': '#CCCCCC',
        'brand-gray-light': '#FFFFFF',
      },
    },
  },
};

export default config;
