import tailwindScrollbar from "tailwind-scrollbar";

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust the path based on your project structure
  ],
  theme: {
    extend: {},
  },
  variants: {
    scrollbar: ['rounded'], // Enables rounded scrollbar variants
  },
  plugins: [tailwindScrollbar],
};
