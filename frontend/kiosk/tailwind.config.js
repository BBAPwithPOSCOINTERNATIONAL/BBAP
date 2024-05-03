/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontSize: {
			"3xs": "12px",
			"2xs": "18px",
			xs: "22px",
			sm: "26px",
			base: "32px",
			lg: "38px",
			xl: "44px",
			"2xl": "50px",
			"3xl": "56px",
		},
		extend: {
			fontFamily: {
				"hyemin-bold": ["IM_Hyemin-Bold", "sans-serif"],
				"hyemin-regular": ["IM_Hyemin-Regular", "sans-serif"],
			},
			colors: {
				"primary-color": "#163760",
				"bg-color": "#8AB9D4",
				"active-color": "#179F0B",
				"inactive-color": "#DFDFDF",
			},
		},
	},
	plugins: [],
};
