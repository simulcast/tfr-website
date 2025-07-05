import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#004116',
        'background-green': '#eff6f2',
        'card-gray': '#d9d9d9',
        'card-shadow-green': '#397e58',
        'metadata-gray': '#ebebeb',
      },
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'heading-main': '4rem',
        'heading-section': '2rem',
        'body-main': '1.5rem',
        'metadata': '1rem',
      },
      screens: {
        'mobile': {'max': '47.9375rem'},
        'tablet': {'min': '48rem', 'max': '63.9375rem'},
        'desktop': {'min': '64rem'},
      },
      spacing: {
        '120': '7.5rem',
        '496': '31rem',
        '345': '21.5625rem',
        '280': '17.5rem',
        '200': '12.5rem',
        '1440': '90rem',
        '800': '50rem',
        '359': '22.4375rem',
      },
    },
  },
  plugins: [],
};

export default config; 