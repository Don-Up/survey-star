/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all relevant file types
  ],
  theme: {
    extend: {
      height:{
        'content': 'calc(100vh - 64px*2)',
      },
      colors: {
        'light-blue': '#5BCEFA',
        'blue': '#48A9FE',
        'button-blue': '#1890ff'
      },
    }, // Customize your theme here
  },
  plugins: [], // Add plugins if needed
};