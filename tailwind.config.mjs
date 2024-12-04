/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      backgroundColor: {
        "primary-bg": "#f2eae1",
        "secondary-bg": "#fc9fa2",
      },
      backgroundImage: {
        gradient:
          "linear-gradient(90deg, rgba(255,136,244,1) 20%, rgba(231,55,211,1) 63%, rgba(228,30,206,1) 88%, rgba(221,43,223,1) 100%)",
      },
    },
    colors: {
      "primary-txt": "#5f3b3c",
    },
  },
  plugins: [require("flowbite/plugin")],
};
