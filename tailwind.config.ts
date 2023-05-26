import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundColor: {
        "dark-gray": "#121212",
      },
    },
  },
  plugins: [],
} satisfies Config;
