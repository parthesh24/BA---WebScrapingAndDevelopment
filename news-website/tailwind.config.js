/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable dark mode using class strategy
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true, // Center the container
      padding: "1.5rem", // Slightly more padding for better spacing
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"], // Use Inter font for better readability
        serif: ["Merriweather", "ui-serif", "Georgia", "serif"], // Serif font for article content
      },
      fontSize: {
        base: "1rem", // Base font size
        lg: "1.125rem", // Slightly larger for better readability
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
      },
      lineHeight: {
        tight: "1.25", // Tighter line height for headings
        snug: "1.375", // Snug line height for subheadings
        normal: "1.5", // Normal line height for body text
        relaxed: "1.625", // Relaxed line height for long articles
        loose: "2", // Loose line height for special cases
      },
      spacing: {
        18: "4.5rem", // Additional spacing for larger gaps
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"), // Enhanced typography
    require("tailwindcss-animate"), // Animations
    require("@tailwindcss/line-clamp"), // Line clamping for article excerpts
    require("@tailwindcss/aspect-ratio"), // Aspect ratio for images and videos
  ],
};