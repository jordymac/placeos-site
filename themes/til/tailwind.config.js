/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './layouts/**/*.html',             // your root layouts
    './partials/**/*.html',            // your root partials (if used)
    './content/**/*.md',               // your markdown
    './assets/ts/**/*.ts',             // scripts that might include classes
    './themes/til/layouts/**/*.html',  // the theme’s layouts
    './themes/til/partials/**/*.html', // the theme’s partials
  ],
  plugins: [require('@tailwindcss/typography')],
  safelist: [
    'chroma', 
    'sticky',
    'backdrop-blur',       // generic blur
    'backdrop-blur-sm',
    'backdrop-blur-md',
    'backdrop-blur-lg',
    'bg-white/25',
    'dark:bg-gray-900/40',]
};
