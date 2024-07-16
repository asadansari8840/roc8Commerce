import {type Config} from 'tailwindcss';
import {fontFamily} from 'tailwindcss/defaultTheme';

export default {
    content: ['./src/**/*.tsx'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...fontFamily.sans],
            },
            colors: {
                'primary-light-gray': '#F4F4F4',
                'dark-gray-text': '#333333',
                'primary-border': '#C1C1C1',
                'light-gray-text': '#ACACAC',
            },
        },
    },
    plugins: [],
} satisfies Config;
