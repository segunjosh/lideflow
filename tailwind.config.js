/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#050505',
                'neon-cyan': '#00f3ff', // Primary Accent
                'electric-gold': '#ffd700', // Secondary Accent
            },
            fontFamily: {
                sans: ['Syne', 'sans-serif'], // Headlines
                mono: ['Space Mono', 'monospace'], // Data/Technical
            },
            animation: {
                'spin-slow': 'spin 20s linear infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'ticker': 'ticker 40s linear infinite',
            },
            keyframes: {
                ticker: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            },
        },
    },
    plugins: [],
}
