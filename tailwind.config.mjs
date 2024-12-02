/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			backgroundImage: {
				"wave-image": "url('/bg-header.png')",
			  },
		},
	},
	plugins: [require("flowbite/plugin")],
}
