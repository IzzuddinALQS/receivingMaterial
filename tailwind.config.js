import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                accent: {
                    50: "#eef6f4",
                    100: "#d7e9e4",
                    200: "#b0d3ca",
                    300: "#84b8ab",
                    400: "#5b9c8b",
                    500: "#3d8271",
                    600: "#2f6a5b",
                    700: "#27554a",
                    800: "#20443c",
                    900: "#1a3731",
                },
            },
        },
    },

    plugins: [forms],
};
