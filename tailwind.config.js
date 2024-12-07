const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class"], // Ativa o modo escuro baseado em classe
  content: [
    "./src/_root/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/components/_navigation/**/*.{ts,tsx}",
    "./src/components/layout/**/*.{ts,tsx}",
    "./src/components/Shared/**/*.{ts,tsx}",
    "./src/components/Transition/**/*.{ts,tsx}",
    "./src/pages/**/*.{ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "primary-500": "#8C429D",
        "background-card-color": "#F1EEDD",
        "primary-600": "#FF5A5A",
        "secondary-500": "#FFB620",
        "off-white": "#D0DFFF",
        red: "#FF5A5A",
        "dark-1": "#000000",
        "dark-2": "#FFFFFF",
        "dark-3": "#101012",
        "dark-4": "#FFFF",
        "light-1": "#FFFFFF",
        "light-2": "#5C5C7B",
        "light-3": "#7878A3",
        "light-4": "#5C5C7B",
        "purple-1": "#8C429D",
      },
      screens: {
        xs: "480px",
      },
      width: {
        420: "420px",
        465: "465px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "sun-spin": {
          "0%": { transform: "rotate(0deg)", opacity: "0.8" },
          "100%": { transform: "rotate(360deg)", opacity: "1" },
        },
        "moon-float": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.9" },
          "50%": { transform: "translateY(-8px)", opacity: "1" },
        },
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "fade-out": {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        "slide-left": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-right": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "zoom-in": {
          from: { transform: "scale(0.5)", opacity: 0 },
          to: { transform: "scale(1)", opacity: 1 },
        },
        "zoom-out": {
          from: { transform: "scale(1)", opacity: 1 },
          to: { transform: "scale(0.5)", opacity: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin 3s linear infinite",
        "sun-spin": "sun-spin 2s linear infinite",
        "moon-float": "moon-float 3s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-in",
        "fade-out": "fade-out 0.5s ease-out",
        "slide-left": "slide-left 0.5s ease-in-out",
        "slide-right": "slide-right 0.5s ease-in-out",
        "zoom-in": "zoom-in 0.5s ease-in-out",
        "zoom-out": "zoom-out 0.5s ease-in-out",
      },
      backgroundImage: {
        "background-wallpaper": "url('/assets/wallpaper.svg')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
