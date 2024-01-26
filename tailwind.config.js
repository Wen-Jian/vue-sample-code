/** @type {import('tailwindcss').Config} */
import path from 'path';

console.log('tailwind', path.resolve(__dirname) + '/src/views/**/*.vue');

module.exports = {
  darkMode: 'class',
  content: {
    relative: true,
    files: [
      path.resolve(__dirname) + '/src/**/*.{js,jsx,ts,tsx,vue}',
      path.resolve(__dirname) + '/src/views/**/*.vue',
    ],
  },
  important: true,
  theme: {
    extend: {},
  },
  plugins: [],
};
