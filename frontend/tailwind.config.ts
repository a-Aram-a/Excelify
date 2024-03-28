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
        "primary": "#C14DF3",
        "secondary": "#F8FF48",
        "background": "#FFFFFF",
        "text": "#000000",
        "text2": "#FFFFFF",
      }
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#C14DF3",
          "secondary": "#F8FF48",
          "accent": "#6eda00",
          "neutral": "#000000",
          "base-100": "#f5fff9",
          "info": "#00ddff",
          "success": "#00df7e",
          "warning": "#eab400",
          "error": "#e20018",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
