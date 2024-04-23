/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontSize: {
			"3xs": "20px",
			"2xs": "28px",
			xs: "36px",
			sm: "44px",
			base: "52px",
			lg: "60px",
			xl: "68px",
			"2xl": "76px",
			"3xl": "80px",
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
				"inactive-color": "#777777",
			},
		},
	},
	plugins: [],
};
