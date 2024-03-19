/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'custom-red': '#ff334e',
                'custom-red-dark': '#e63048'
            }
        },
        
    },
    plugins: [
        require('@tailwindcss/forms')
    ],
}