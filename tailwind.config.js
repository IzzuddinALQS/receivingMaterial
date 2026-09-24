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
                sans: ["Inter", ...defaultTheme.fontFamily.sans],
            },
            borderRadius: {
                xl: "0.875rem",
                "2xl": "1.25rem",
            },
            colors: {
                // Hijau Kalbe - primary accent (kesehatan, kesegaran)
                accent: {
                    50: "#eefaf3",
                    100: "#d3f2e0",
                    200: "#a7e4c1",
                    300: "#72cf9d",
                    400: "#3fb87c",
                    500: "#1fa066",
                    600: "#158452",
                    700: "#136943",
                    800: "#125437",
                    900: "#10462f",
                },
                // Biru Medis - secondary accent (profesionalisme, keahlian medis)
                secondary: {
                    50: "#eef6fc",
                    100: "#d6e9f7",
                    200: "#aed3ef",
                    300: "#7db7e3",
                    400: "#4998d3",
                    500: "#277fc0",
                    600: "#1c65a0",
                    700: "#195281",
                    800: "#18436a",
                    900: "#17395a",
                },
            },
        },
    },

    plugins: [forms],
};
