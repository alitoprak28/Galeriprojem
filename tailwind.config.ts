import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        steel: "rgb(var(--steel) / <alpha-value>)"
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"]
      },
      boxShadow: {
        halo: "0 32px 120px rgba(0, 0, 0, 0.36)",
        panel: "0 28px 100px rgba(0, 0, 0, 0.24)"
      },
      maxWidth: {
        shell: "92rem"
      },
      letterSpacing: {
        luxe: "0.24em"
      }
    }
  },
  plugins: []
};

export default config;

