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
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        }
      },
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
    },
    fontFamily: {
      sans: ["var(--font-inter)", "sans-serif"],
      display: ["var(--font-outfit)", "sans-serif"],
    },
    backgroundImage: {
      "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      "industrial-gradient": "linear-gradient(to right bottom, #0B1121, #1a243e)",
    },
  },
},
  plugins: [],
};
export default config;
