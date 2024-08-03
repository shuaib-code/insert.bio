/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html',
    './views/**/*.ejs', // If you use EJS templates
    './views/**/*.hbs', // If you use Handlebars templates
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
