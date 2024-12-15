/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        form: "#FAF0D7",
        button: "#FE4E4E",
      },
      padding: {
        "116px": "116px",
        "113px": "113px",
      },
      borderRadius: {
        mainRadius: "37px",
      },
      fontFamily: {
        notoSans: ["NotoSans"],
      },
    },
  },
  plugins: [],
};
