import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                golden: "#D3AA4A",
                "soft-black": "#292E36",
                "light-gray": "#F7F8F9",
                "deep-red": "#460A0A",
                "bright-red": "#AC1919",
                "kimbo-red": "#EB2E23",
            },
        },
    },
    plugins: [],
};
export default config;
