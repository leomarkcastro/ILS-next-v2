/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Rampart: ["Jost", "sans-serif"],
        Alegreya: ["Alegreya"],
      },
      animation: {
        "pulse-4s": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-6s": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  // plugins: [require("daisyui")],
  plugins: [require("@tailwindcss/forms"), require("daisyui")],

  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          primary: "#f97316",
          secondary: "#3b82f6",
          accent: "#c026d3",
          neutral: "#251C31",
          "base-100": "#Fff",
          info: "#5191F0",
          success: "#165A3E",
          warning: "#EDC55A",
          error: "#FA143E",
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "d-",
    darkTheme: "light",
  },
};
