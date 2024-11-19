/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Ana renkler
        primary: {
          DEFAULT: '#7c3aed', // Ana mor renk
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#7c3aed',
          600: '#6d28d9',
          700: '#5b21b6',
          800: '#4c1d95',
          900: '#2e1065'
        },
        // Arka plan renkleri
        background: {
          DEFAULT: '#0a0a0a',    // Ana arka plan
          light: '#1a1a1a',      // Kart arka planı
          lighter: '#262626',    // Hover durumları
        },
        // Border renkleri
        border: {
          DEFAULT: '#262626',    // Ana border rengi
          light: '#404040',      // Açık border
          hover: '#525252',      // Hover border
        }
      }
    }
  }
}