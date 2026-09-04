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
        'brand-orange': '#FF8A00',
        'brand-dark-bg': '#121214',
        'brand-card-bg': '#1E1E24',
        'brand-gray-dark': '#2E2E38',
        'brand-gray-medium': '#7C7C8A',
        'brand-gray-light': '#E1E1E6',
      },
    },
  },
};

export default config;
