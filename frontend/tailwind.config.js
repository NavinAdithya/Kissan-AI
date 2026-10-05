/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#061d15',
          900: '#0a2e22',
          800: '#114434',
          700: '#195c47',
          600: '#23785d',
        },
        leaf: {
          600: '#15803d',
          500: '#16a34a',
          400: '#22c55e',
          300: '#4ade80',
          100: '#dcfce7',
          50: '#f0fdf4',
        },
        cream: {
          50: '#fcfbf8',
          100: '#f7f5ed',
          200: '#efece0',
          300: '#e1dcc9',
        },
        charcoal: {
          900: '#111827',
          800: '#1f2937',
          700: '#374151',
          600: '#4b5563',
          500: '#6b7280',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'premium': '0 10px 30px -5px rgba(10, 46, 34, 0.08), 0 4px 12px -2px rgba(10, 46, 34, 0.03)',
        'elevated': '0 20px 40px -10px rgba(10, 46, 34, 0.12), 0 8px 16px -4px rgba(10, 46, 34, 0.06)',
      }
    },
  },
  plugins: [],
}
