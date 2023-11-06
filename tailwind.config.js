/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        1.5: "1.5px",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".custom-fill-color-none": {
          "--custom-fill-color": "none",
        },
        ".custom-fill-color-gray-400": {
          "--custom-fill-color": " rgb(156, 163, 175)",
        },
      };

      addUtilities(newUtilities, ["group", "hover"]);
    },
  ],
};
