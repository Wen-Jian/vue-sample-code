const tailwindcss = require('tailwindcss');
// const autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [
        tailwindcss('apps/chat-client/tailwind.config.js')
    ],
};