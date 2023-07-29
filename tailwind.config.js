/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      sm: "14px",
      md: "16px",
      lg: "18px",
    },
    extend: {
      colors: {
        heavyBlue: "#1C3F6C",
        darkBlue: "#4C648E",
        mainBlue: "#6F93C2",
        blueGradient:
          "linear-gradient(90deg, rgba(9,54,121,1) 0%, rgba(2,0,36,1) 100%)",
        purpleBlue: "#B6C1D9",
        paleBlue: "#B7D1E1",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundPosition: {
        "top-4": "center top 2rem",
      },
      blur: {
        xs: "0.5px",
      },
    },
  },
  plugins: [],
};
