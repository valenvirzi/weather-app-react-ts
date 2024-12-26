/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // TODO: Set the correct url for each theme to be able to use them as dynamic classes.
      // backgroundImage: {
      //   rain: "url('/images/rain.jpg')",
      //   thunderstorm: "url('/images/thunderstorm.jpg')",
      //   drizzle: "url('/images/drizzle.jpg')",
      //   clear: "url('/images/clear.jpg')",
      //   clouds: "url('/images/clouds.jpg')",
      //   snow: "url('/images/snow.jpg')",
      // },
    },
    screens: {
      sm: "320px",
      md: "450px",
      lg: "768px",
      xl: "1024px",
      "2xl": "1440px",
      "3xl": "1920px",
    },
  },
  plugins: [],
};
