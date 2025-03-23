import { heroui } from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        netflix: ['Netflix Sans', 'sans-serif'],
      },
      fontSize: {
        'regular-caption2': '11px',
        'regular-caption1': '13px',
        'regular-smallbody-lw': '14px',
        'regular-smallbody': '14px',
        'regular-body': '16px',
        'regular-headline2': '17px',
        'regular-headline1': '18px',
        'regular-title4': '20px',
        'regular-title3': '21px',
        'regular-title2': '24px',
        'regular-title1': '27px',
        'regular-large-title': '50px',
        'medium-caption2': '12px',
        'medium-caption1': '13px',
        'medium-smallbody': '14px',
        'medium-body': '16px',
        'medium-body-lw': '16px', // LW -0.5
        'medium-headline2': '20px',
        'medium-headline1': '21px',
        'medium-title4': '22px',
        'medium-title3': '24px',
        'medium-title3-lw': '24px', // LW -0.5
        'medium-title2': '28px',
        'medium-title1': '30px',
        'medium-large-title': '33px',
        'bold-title2': '20px',
        'bold-title1': '48px',
        'bold-large-title': '55px',
      },
      colors: {
        red: {
          primary: "#E50914",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}

module.exports = config;