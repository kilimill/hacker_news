export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'], 
  theme: {
    extend: {
      keyframes: {
        'lds-ring': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'lds-ring': 'lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
      },
    }
  },
  plugins: [],
}
