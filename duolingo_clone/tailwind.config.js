/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#6C4EF5",
          deepPurple: "#5B38F6",
          blue: "#4D8BFF",
          green: "#21C16B",
        },
        semantic: {
          success: "#21C16B",
          warning: "#FFC800",
          streak: "#FF8A00",
          error: "#FF4D4F",
          info: "#4D8BFF",
        },
        neutral: {
          textPrimary: "#0D132B",
          textSecondary: "#6B7280",
          border: "#E5E7EB",
          surface: "#F6F7FB",
          background: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["Poppins", "System"],
      },
      fontSize: {
        h1: ["32px", { lineHeight: "38px" }],
        h2: ["24px", { lineHeight: "31px" }],
        h3: ["20px", { lineHeight: "26px" }],
        h4: ["16px", { lineHeight: "24px" }],
        "body-lg": ["16px", { lineHeight: "26px" }],
        "body-md": ["14px", { lineHeight: "22px" }],
        "body-sm": ["13px", { lineHeight: "20px" }],
        caption: ["11px", { lineHeight: "16px" }],
      },
      boxShadow: {
        soft: "0 10px 35px rgba(51, 68, 194, 0.12)",
      },
    },
  },
  plugins: [],
};
