import { heroui } from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background
        bg: "#000000", // Primary background
        bgSecondary: "#222222", // Cards, sections
        // Accents
        primary: "#1DCD9F", // Buttons, highlights
        primaryDark: "#169976", // Hover states
        // Text
        textPrimary: "#FFFFFF", // White for readability
        textSecondary: "#A1A1AA", // Light gray (subtle text)
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}
