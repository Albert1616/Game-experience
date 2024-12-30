import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#712770",
        primaryDark: "#B18FCF",
        background: "#EAEAEA"
      },
      keyframes: {
        sideBar: {
          '0%': { opacity: '0', width: '0' },
          '100%': { opacity: '1', width: '40%' }
        },
      },
      animation: {
        "side-bar": "sideBar .3s linear",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config