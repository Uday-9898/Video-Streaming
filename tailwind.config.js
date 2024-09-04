/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Adjust this path based on your project structure
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      fontFamily: {
        body: ['YourCustomFont', 'sans-serif'], // Add your custom font
        heading: ['YourHeadingFont', 'sans-serif'], // Add your heading font
      },
    },
  },
  plugins: [],
};


