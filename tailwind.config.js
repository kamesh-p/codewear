module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        light: "#ffffff", // Light mode background color
        dark: "#333333", // Dark mode background color
      },
      textColor: {
        light: "#000000", // Light mode text color
        dark: "#ffffff", // Dark mode text color
      },
    },
  },
  plugins: [],
};
