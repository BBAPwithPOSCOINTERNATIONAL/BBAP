/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        60: "60%",
        90: "90%",
        7: "1.75rem",
        80: "80%",
        100: "100%",
        13.5: "3.375rem",
        12.9: "3.225rem",
      },
      fontSize: {
        xs: "0.65rem",
        sm: "0.8rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
      },
      fontFamily: {
        "hyemin-bold": ["IM_Hyemin-Bold", "sans-serif"],
        "hyemin-regular": ["IM_Hyemin-Regular", "sans-serif"],
      },
      colors: {
        "primary-color": "#163760",
        "bg-color": "#739DB5",
        "active-color": "#AC2323",
        "inactive-color": "#777777",
        "light-primary-color": "#669ACB",
        "cafe-primary-color": "#E2F1FF",
        // 추가컬러
        "main-color": "#aa5b42",
        "sub-color": "#f3c5b6",
        "login-color": "#f4e7e3",
        "dashboard-color": "#fffcfb",
        "dashboard-icon-color": "#d6a291",
        "step-color": "#ebcfc6",
        "dark-step-color": "#cea193",
        "gray-color": "#c4c4c4",
        "dark-gray-color": "#686868",
      },
      boxShadow: {
        1.5: "0px 1.5px 0px rgba(0, 0, 0, 0.1)",
        3: "0px 3px 0px rgba(0, 0, 0, 0.3)",
        right:
          "4px 0 6px -1px rgba(226, 241, 255, 0.1), 4px 0 4px -1px rgba(226, 241, 255, 0.1)",
        bottom: "0px 2px 0px rgba(226, 241, 255, 0.8)",
      },
      lineHeight: {
        none: "1",
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
      },
    },
  },
  plugins: [],
};
