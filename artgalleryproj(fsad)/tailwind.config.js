/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/pages/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      textColor: {
        'heading': 'var(--heading-color)',
        'paragraph': 'var(--paragraph-color)',
        'text': 'var(--text-color)',
      },
      backgroundColor: {
        'background': 'var(--background-color)',
        'card-bg': 'var(--card-bg)',
        'button-primary': 'var(--button-primary)',
        'button-hover': 'var(--button-hover)',
        'accent-color': 'var(--accent-color)',
      },
      borderColor: {
        'border-color': 'var(--border-color)',
      },
      boxShadow: {
        'card-shadow': 'var(--card-shadow)',
      },
      gradientColorStops: {
        'gradient-overlay': 'var(--gradient-overlay)',
      },
      colors: {
        primary: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#1a1a1a',
        },
        secondary: {
          50: '#f5f5f5',
          100: '#e0e0e0',
          200: '#bfbfbf',
          300: '#999999',
          400: '#737373',
          500: '#595959',
          600: '#404040',
          700: '#333333',
          800: '#262626',
          900: '#171717',
        },
        accent: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d1d1d6',
          400: '#a0a0ab',
          500: '#70707b',
          600: '#51515b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
        neutral: {
          50: '#ffffff',
          100: '#fafafa',
          200: '#e6e6e6',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      }
    },
  },
  plugins: [],
}