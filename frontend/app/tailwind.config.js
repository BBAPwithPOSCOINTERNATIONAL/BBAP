/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "hyemin-bold": ["IM_Hyemin-Bold", "sans-serif"],
        "hyemin-regular": ["IM_Hyemin-Regular", "sans-serif"],
      },
      colors: {
        "primary-color": "#163760",
        "bg-color": "#739DB5",
        "active-color": "#AC2323",
        "inactive-color": "#777777",
        "light-primary-color": "#4786C1",
        "cafe-primary-color": "#E2F1FF",
      },
    },
  },
  plugins: [],
};
