import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        urjaa: {
          navy: {
            DEFAULT: '#0f172a', // Slate 900
            light: '#334155',   // Slate 700
            dark: '#020617',    // Slate 950
          },
          accent: {
            DEFAULT: '#15803d', // Green 700
            light: '#16a34a',
            dark: '#14532d',
          },
          primary: { // Map primary to Navy for compatibility
            DEFAULT: '#0f172a',
            light: '#1e293b',
            dark: '#020617',
          },
          // Add Slate scale explicitly if needed, or rely on Tailwind default
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-inter)", "sans-serif"], // Changed to Inter for professional look
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
