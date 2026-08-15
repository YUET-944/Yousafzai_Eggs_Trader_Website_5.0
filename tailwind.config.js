/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#FBF7F0',
        'navy-2': '#FBF7F0',
        'navy-deep': '#FBF7F0',
        'navy-ink': '#FBF7F0',
        'navy-glow': 'rgba(185,50,13,0.18)',
        gold: '#DE510A',
        'gold-lt': '#FCF3D9',
        'gold-dk': '#B9320D',
        'gold-soft': '#DE510A',
        herb: '#3F6231',
        'herb-soft': '#55813F',
        'gray-150': '#E8DFC4',
        'gray-100': '#FBF7F0',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        sm: '10px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      boxShadow: {
        sm: '0 2px 10px rgba(63,98,49,0.08)',
        md: '0 14px 36px rgba(63,98,49,0.12)',
        lg: '0 28px 70px rgba(63,98,49,0.16)',
        gold: '0 10px 24px rgba(185,50,13,0.22)',
        'gold-lg': '0 16px 40px rgba(185,50,13,0.3)',
      },
      maxWidth: {
        'content': '1240px',
      },
      animation: {
        float1: 'float1 12s ease-in-out infinite',
        float2: 'float2 14s ease-in-out infinite',
        bob: 'bob 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s infinite',
        spin: 'spin 30s linear infinite',
      },
      keyframes: {
        float1: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-30px, 30px)' },
        },
        float2: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(25px, -22px)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseGold: {
          '0%': { boxShadow: '0 0 0 0 rgba(222,81,10,0.55)' },
          '70%': { boxShadow: '0 0 0 8px rgba(222,81,10,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(222,81,10,0)' },
        },
      },
    },
  },
  plugins: [],
};
