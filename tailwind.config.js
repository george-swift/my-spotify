/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      animation: {
        rhythm: 'rhythm 400ms linear infinite'
      },
      boxShadow: {
        card: '0 0 10px rgba(0, 0, 0, 0.3)'
      },
      colors: {
        black: {
          100: 'var(--black-accent-1)',
          200: 'var(--black-accent-2)'
        },
        green: {
          100: 'var(--green-accent-1)',
          200: 'var(--green-accent-2)'
        },
        gray: {
          100: 'var(--gray-accent-1)',
          200: 'var(--gray-accent-2)',
          300: 'var(--gray-accent-3)',
          400: 'var(--gray-accent-4)'
        }
      },
      keyframes: {
        rhythm: {
          '0%': { height: '10px' },
          '100%': { height: '100%' }
        }
      }
    }
  },
  plugins: []
}
