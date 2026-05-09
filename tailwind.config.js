/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
      './src/pages/**/*.{js,jsx}',
      './src/components/**/*.{js,jsx}',
      './src/sections/**/*.{js,jsx}',
      './src/app/**/*.{js,jsx}',
    ],
    theme: {
      extend: {
        colors: {
          bgPrimary:   '#07111F',
          bgCard:      '#0F172A',
          accentGreen: '#00FF85',
          accentBlue:  '#00BFFF',
          textWhite:   '#FFFFFF',
          textSecondary: '#94A3B8',
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          display: ['Bebas Neue', 'sans-serif'],
        },
        backgroundImage: {
          'hero-gradient': 'linear-gradient(135deg, #07111F 0%, #0a1628 50%, #07111F 100%)',
          'card-gradient': 'linear-gradient(145deg, #0F172A, #0d1f3c)',
          'green-glow':    'radial-gradient(circle, rgba(0,255,133,0.15) 0%, transparent 70%)',
          'blue-glow':     'radial-gradient(circle, rgba(0,191,255,0.15) 0%, transparent 70%)',
        },
        boxShadow: {
          'neon-green': '0 0 20px rgba(0, 255, 133, 0.4)',
          'neon-blue':  '0 0 20px rgba(0, 191, 255, 0.4)',
          'card':       '0 8px 32px rgba(0, 0, 0, 0.4)',
        },
        animation: {
          'pulse-slow':   'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'float':        'float 6s ease-in-out infinite',
          'glow-pulse':   'glow 2s ease-in-out infinite alternate',
          'ticker':       'ticker 30s linear infinite',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%':      { transform: 'translateY(-20px)' },
          },
          glow: {
            from: { boxShadow: '0 0 10px rgba(0,255,133,0.3)' },
            to:   { boxShadow: '0 0 30px rgba(0,255,133,0.7)' },
          },
          ticker: {
            '0%':   { transform: 'translateX(100%)' },
            '100%': { transform: 'translateX(-100%)' },
          },
        },
      },
    },
    plugins: [],
  };
  