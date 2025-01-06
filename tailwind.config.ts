import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
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
        'button-blue': '#3199E8',
        'approve': '#17CA1D',
        'reject': '#CA2B17',
        'request': '#D6EAFA',
        'inactive': '#4A5863',
        'info': '#3199E8',
      },
    },
    fontFamily: {
      'button': ['Inter', 'Outfit'],
      'body': ['"Open Sans"'],
    }
  },
  plugins: [],
} satisfies Config;
