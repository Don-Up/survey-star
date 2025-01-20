/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
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
        'button-blue': '#1890ff',
        'edit': "#f0f2f5"
      },
      boxShadow: {
        custom: '0 2px 10px rgba(0, 0, 0, 0.12)', // 0 2px 10px #0000001f
      },
    }, // Customize your theme here
  },
  plugins: [], // Add plugins if needed
};