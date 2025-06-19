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
  theme: {
    extend: {
      animationDelay: {
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1s',
        '1500': '1.5s',
        '2000': '2s',
      },
      animationDuration: {
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1s',
        '1500': '1.5s',
        '2000': '2s',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    require('tailwindcss-animation-delay'),
  ],
  safelist: [
    'chroma', 
    'sticky',
    'backdrop-blur',       // generic blur
    'backdrop-blur-sm',
    'backdrop-blur-md',
    'backdrop-blur-lg',
    'bg-white/25',
    'dark:bg-gray-900/40',
    { pattern: /^delay-/ },
    { pattern: /^duration-/ },
]
};
