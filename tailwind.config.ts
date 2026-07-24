import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#071A2B",
        cobalt: "#185ADB",
        ink: "#101214",
        muted: "#34383D",
        line: "#E8EBEE",
        paper: "#F6F7F8"
      }
    }
  },
  plugins: []
};

export default config;
