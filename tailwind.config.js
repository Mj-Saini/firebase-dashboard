/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(90deg, #8A2387 0%, #E94057 49.43%, #F27121 105.44%)",
      },
    },
  },
  plugins: [],
};
