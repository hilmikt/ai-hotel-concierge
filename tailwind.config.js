/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hotel: {
          bg: '#0f0f0f',         // Deep Charcoal (Dark Mode BG)
          surface: '#1a1a1a',    // Soft Onyx (Dark Mode Surface)
          text: '#eaeaea',       // Warm Off-White (Dark Mode Text)
          muted: '#9a9a9a',      // Muted Gray
          gold: '#C5A059',       // Champagne Gold

          // Light Mode Overrides
          cream: '#ffffff',      // Pure White (Light Mode BG) - Replaced F2F2EF for cleaner look
          'surface-light': '#f4f4f5', // Zinc-100 (Light Mode Surface)
          'text-dark': '#18181b',     // Zinc-900 (Light Mode Text)
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
