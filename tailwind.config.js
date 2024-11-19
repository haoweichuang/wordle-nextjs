/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bullet: {
          // from: { transform: "translateX(0%)" },
          // to: { transform: "translateX(-200%)" },
          "0%": { transform: "translateX(100%)" }, // 從螢幕右側外開始
          "100%": { transform: "translateX(-1000%)" }, // 移動到螢幕左側外
        },
      },
      animation: {
        bullet: "bullet 6s linear",
      },
    },
  },
  plugins: [],
};
