/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    fontFamily: {
      xs: ['12px', '14px'],
      Nunito: ["Nunito", "sans-serif"],
    },
    extend: {
      screens: {
        sm: "460px",
        md: "768px",
        lg: "1024px",
        xl: "1170px",
        '2xl': 'none'
      },
      container: {
        padding: {
          DEFAULT: "16px",
          md: "32px",
          lg: "60px",
          xl: "0",
        },
        center: true,
        maxWidth: "1170px",
      },

      colors: {
        text_black: "rgba(0, 0, 0, 0.87)",
        yellow: "#F4E041",
        yellow_hover: "#FFE302",
        blue: "#00BDD3",
        light_gray: "#F8F8F8",
        error: "#CB3D40",
        gray: "#7E7E7E",
        white: "#FFFFFF",
        black_cover: "rgba(0, 0, 0, 0.5)",
        error: '#CB3D40',
      },
    },
  },
  plugins: [],
};
