
module.exports = {
  // ==========================
  // Tailwind CSS Configuration
  // ==========================

  // 1. Ativação do Dark Mode
  darkMode: "class", // Ativa o modo escuro baseado na classe "dark"

  // 2. Configuração do Content
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

  // 3. Customização do Tema
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1800px", // Extra para telas grandes
      },
    },
    extend: {
      // Paleta de Cores Dinâmica
      colors: {
        primary: {
          DEFAULT: "#3b82f6", // Azul padrão
          light: "#93c5fd",   // Azul claro
          dark: "#2563eb",    // Azul escuro
        },
        background: {
          light: "#f9fafb",   // Fundo claro
          dark: "#1f2937",    // Fundo escuro
          cardLight: "#ffffff", // Cartão claro
          cardDark: "#374151",  // Cartão escuro
        },
        text: {
          light: "#1f2937", // Texto no light mode
          dark: "#f9fafb",  // Texto no dark mode
          primary: "#3b82f6", // Azul padrão
        },
        border: {
          light: "#e5e7eb", // Bordas claras
          dark: "#4b5563",  // Bordas escuras
        },
        white: "#FFFFFF",
        black: "#000000",
        transparent: "transparent",
        gray: {
          100: "#F5F5F5",
          200: "#E5E5E5",
          700: "#5C5C7B",
          800: "#3B3B4F",
          900: "#1B1B1D",
        },
      },

      // Adicionando Fontes
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },

      // Larguras Personalizadas
      width: {
        420: "420px",
        465: "465px",
      },

      // Keyframes e Animações
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        pulse: {
          "0%, 100%": { opacity: 1, transform: "scale(1)" },
          "50%": { opacity: 0.7, transform: "scale(1.05)" },
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
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-in",
        "fade-out": "fade-out 0.5s ease-out",
        "slide-left": "slide-left 0.5s ease-in-out",
        "slide-right": "slide-right 0.5s ease-in-out",
        "zoom-in": "zoom-in 0.5s ease-in-out",
        "zoom-out": "zoom-out 0.5s ease-in-out",
      },

      // Imagens de Fundo Personalizadas
      backgroundImage: {
        "background-wallpaper": "url('/assets/wallpaper.svg')",
        "hero-pattern": "url('/assets/hero-pattern.svg')",
      },
    },
  },

  // 4. Plugins Extras
  plugins: [
    require("tailwindcss-animate"), // Animações
    require("tailwind-scrollbar"), // Barra de rolagem customizada
    require("@tailwindcss/typography"), // Estilo para blogs e textos
  ],
};
