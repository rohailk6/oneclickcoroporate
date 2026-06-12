import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#FF1A1A",
          "red-dark": "#CC0000",
          "red-light": "#FF4D4D",
          black: "#000000",
          "off-white": "#F7F7F7",
          "dark-gray": "#222222",
          "light-gray": "#EAEAEA"
        }
      },
      boxShadow: {
        soft: "0 18px 50px rgba(0,0,0,0.08)",
        red: "0 8px 32px rgba(255,26,26,0.25)",
        card: "0 2px 16px rgba(0,0,0,0.06)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"]
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        pulse2: "pulse2 2s ease-in-out infinite"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        },
        pulse2: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" }
        }
      }
    }
  },
  plugins: []
};

export default config;
