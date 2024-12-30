import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/section/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
          background: 'var(--primary-foreground)',
          'blue': 'var(--root-blue)',
          'text-button': 'var(--text-button)',
          'root-violet': 'var(--root-violet)',
          'root-light': 'var(--root-base)',
          'root-dark': 'var(--root-dark)',
          'root-green': 'var(--root-green)',
          'root-orange': 'var(--root-orange)',
          'root-orange-dark': 'var(--root-orange-dark)',
          'root-mint': 'var(--root-mint)',
          'root-mint-dark': 'var(--root-mint-dark)',
          'root-cyan': 'var(--root-cyan)',
          'root-red': 'var(--root-red)',
          'root-green-bold': 'var(--root-green-bold)',
          'root-background-table': 'var(--root-background-table)',
          'blue-light': 'var(--root-blue-light)',
          'main-background': 'var(--root-background)',
        },
        keyframes: {
          wave: {
            '0%': { transform: 'translateY(150%) scale(1.7)' },
            '100%': { transform: 'translateY(0) scale(1.4)' },
          },
        },
        animation: {
          wave: 'wave 0.45s ease-in-out',
        },
      }
    },
  },
  plugins: [],
} satisfies Config;
