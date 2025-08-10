/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#ffffff", // blue-500 light
          dark: "#000000", // blue-600 dark
        },
        secondary: {
          light: "#dedede",
          dark: "#212121",
        },
        tertiary: {
          light: "#cfcfcf",
          dark: "#303030",
        },
        last: {
          light: "#a6a6a6",
          dark: "#424242",
        },
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
