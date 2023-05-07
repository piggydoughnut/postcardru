/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainHeaders: "#1C3F6C",
        header: "#7493c0",
        mainText: "#4c648e",
        blueGradient:
          "linear-gradient(90deg, rgba(9,54,121,1) 0%, rgba(2,0,36,1) 100%)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundPosition: {
        "top-4": "center top 2rem",
      },
    },
  },
  plugins: [],
};
