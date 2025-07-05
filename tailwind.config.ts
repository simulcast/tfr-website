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
        'heading-main': '64px',
        'heading-section': '32px',
        'body-main': '24px',
        'metadata': '16px',
      },
      screens: {
        'mobile': {'max': '767px'},
        'tablet': {'min': '768px', 'max': '1023px'},
        'desktop': {'min': '1024px'},
      },
    },
  },
  plugins: [],
};

export default config; 