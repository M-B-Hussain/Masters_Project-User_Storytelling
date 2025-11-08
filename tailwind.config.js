module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'db-red': '#F50101',
        'db-green': '#1e5200ff',
        'db-dark-green': '#003a2bff',
        'db-light-green': '#97d005ff',
        'db-gray': '#949090ff',
        'db-dark-gray': '#484545',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
