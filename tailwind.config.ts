import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            keyframes: {
                heartPop: {
                    '0%': { transform: 'scale(1)' },
                    '40%': { transform: 'scale(1.3)' },
                    '60%': { transform: 'scale(0.95)' },
                    '100%': { transform: 'scale(1)' },
                },
            },
            animation: {
                heartPop: 'heartPop 0.5s ease-out',
            },
        },
    },
    plugins: [],
} satisfies Config;
