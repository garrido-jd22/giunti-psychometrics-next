import localFont from "next/font/local";

// Inter variable (100–900): un archivo normal y otro itálica.
export const inter = localFont({
    src: [
        {
            path: "../public/fonts/Inter/Inter-VariableFont_opsz,wght.ttf",
            weight: "100 900",
            style: "normal",
        },
        {
            path: "../public/fonts/Inter/Inter-Italic-VariableFont_opsz,wght.ttf",
            weight: "100 900",
            style: "italic",
        },
    ],
    variable: "--font-inter",
    display: "swap",
});
