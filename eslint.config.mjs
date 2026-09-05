import { defineConfig } from 'eslint/config';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
  {
    ignores: ['coverage/**', '.next/**'],
  },
  ...nextCoreWebVitals,
  eslintConfigPrettier,
]);
