/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      main: ["Roboto", "sans-serif"],
    },
    extend: {
      // colors: {
      //     white: "#ffffff",
      //     black: "#000000",
      //     gray: '#f5f5f5',
      //     light: '#d3d3d3',
      //     text: {
      //         head: '#3a3a3a',
      //         body: '#6d6d6d',
      //         light: '#8a8a8a',
      //     },
      //     primary: '#2c65ea',
      //     secondary: '#e2e2e2',
      //     alert: '#e94f2c',
      //     line: '#ececec',
      // },
    },
  },
  plugins: [
    require("tailwindcss-labeled-groups")(["1", "2", "3"]),
    require("tailwind-scrollbar"),
  ],
};
