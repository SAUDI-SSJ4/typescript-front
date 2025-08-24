/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Kaff", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
        kaff: ["Kaff", "sans-serif"],
        dubai: ["Dubai", "sans-serif"],
        amiri: ["Amiri", "serif"],
        tajawal: ["Tajawal", "sans-serif"],
        noto: ["Noto Sans Arabic", "sans-serif"],
        cairo: ["Cairo", "sans-serif"],
        almarai: ["Almarai", "sans-serif"],
        baloo: ["Baloo Bhaijaan 2", "sans-serif"],
      },
      fontSize: {
        'xs': ['0.675rem', { lineHeight: '1rem' }],      // 10.8px (تصغير 10% من 12px)
        'sm': ['0.79rem', { lineHeight: '1.25rem' }],    // 12.6px (تصغير 10% من 14px)
        'base': ['0.9rem', { lineHeight: '1.5rem' }],    // 14.4px (تصغير 10% من 16px)
        'lg': ['1.01rem', { lineHeight: '1.75rem' }],    // 16.2px (تصغير 10% من 18px)
        'xl': ['1.13rem', { lineHeight: '1.75rem' }],    // 18px (تصغير 10% من 20px)
        '2xl': ['1.35rem', { lineHeight: '2rem' }],      // 21.6px (تصغير 10% من 24px)
        '3xl': ['1.69rem', { lineHeight: '2.25rem' }],   // 27px (تصغير 10% من 30px)
        '4xl': ['2.03rem', { lineHeight: '2.5rem' }],    // 32.4px (تصغير 10% من 36px)
        '5xl': ['2.7rem', { lineHeight: '1' }],          // 43.2px (تصغير 10% من 48px)
        '6xl': ['3.38rem', { lineHeight: '1' }],         // 54px (تصغير 10% من 60px)
        '7xl': ['4.05rem', { lineHeight: '1' }],         // 64.8px (تصغير 10% من 72px)
        '8xl': ['5.4rem', { lineHeight: '1' }],          // 86.4px (تصغير 10% من 96px)
        '9xl': ['7.2rem', { lineHeight: '1' }],          // 115.2px (تصغير 10% من 128px)
      },
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring))",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary))",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary))",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive))",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted))",
          foreground: "oklch(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "oklch(var(--accent))",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
