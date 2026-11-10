/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // Preflight (Tailwind's CSS reset) is OFF on purpose: the original MM Builders design
  // relies on browser-default spacing in many places and must look pixel-identical.
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        ink: '#0b1622',
        night: '#08131f',
        gold: { DEFAULT: '#e8c26a', deep: '#c9962f', soft: '#f6dc8e' },
        teal: { DEFAULT: '#1f8a8a', deep: '#14404a' },
        mist: '#a9b8c5',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
