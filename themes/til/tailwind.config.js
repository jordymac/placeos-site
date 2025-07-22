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
    'animate-in',
    'fade-in',
    { pattern: /^delay-/ },
    { pattern: /^duration-/ },
    { pattern: /^animate-/ },
    { pattern: /^slide-in-from-/ },
    { pattern: /^my-/ },
    { pattern: /^mt-/ },
    { pattern: /^mb-/ },
    { pattern: /^m-/ },
    'not-prose',
    'flex',
    'flex-wrap',
    'gap-1',
    'gap-4',
    'w-12',
    'h-12',
    'bg-gray-100',
    'bg-gray-200',
    'bg-gray-300',
    'rounded-lg',
    'items-center',
    'justify-center',
    'text-lg',
    'font-semibold',
    'mb-4',
]
};
