// tailwind.config.js
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						"max-width": "none",
						color: "#333",
						p: {
							marginTop: "1.5em",
							marginBottom: "1.5em",
						},
						a: {
							color: "#2563eb",
							"&:hover": {
								color: "#1d4ed8",
							},
							textDecoration: "none",
						},
						h1: {
							fontWeight: "400",
							fontFamily: "serif",
						},
						h2: {
							fontWeight: "400",
							fontFamily: "serif",
						},
						h3: {
							fontWeight: "400",
							fontFamily: "serif",
						},
					},
				},
			},
		},
	},
	plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
