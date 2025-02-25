import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        "btn-gradient":
          "linear-gradient(165.54deg, #141333 -33.39%, #202261 15.89%, #543c97 55.84%, #6939a2 74.96%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
