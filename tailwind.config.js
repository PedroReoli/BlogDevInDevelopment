const defaultTheme = require("tailwindcss/defaultTheme")
const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  darkMode: ["class"],
  content: [
    "./src/_root/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/components/_navigation/**/*.{ts,tsx}",
    "./src/components/layout/**/*.{ts,tsx}",
    "./src/components/Shared/**/*.{ts,tsx}",
    "./src/components/Transition/**/*.{ts,tsx}",
    "./src/pages/**/*.{ts,tsx}",
    "./public/index.html",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        xs: "320px",
        sm: "375px",
        md: "425px",
        tablet: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1600px",
        "4xl": "1920px",
        "5xl": "2560px",
      },
    },
    screens: {
      xs: "320px", // Smartphones pequenos
      sm: "375px", // Smartphones médios
      md: "425px", // Smartphones grandes
      tablet: "768px", // Tablets
      lg: "1024px", // Tablets grandes e laptops pequenos
      xl: "1280px", // Laptops comuns e telas HD
      "2xl": "1440px", // Monitores maiores (Full HD)
      "3xl": "1600px", // Telas widescreen grandes
      "4xl": "1920px", // Monitores Full HD e TVs
      "5xl": "2560px", // Telas 2K e 4K
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Paleta de Cores Dinâmica
        /*primary: {
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
        },*/
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      // Adicionando Fontes
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        kairos: ["Kairos Sans Extended Medium", "Montserrat", ...defaultTheme.fontFamily.sans],
        //...fontFamily,
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
}

