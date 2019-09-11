module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint/tslint', 'dcr'],
    parserOptions: {
        ecmaVersion: 6,
        project: './tsconfig.json',
        sourceType: 'module',
    },
    rules: {
        '@typescript-eslint/tslint/config': [
            'error',
            {
                lintFile: './tslint.json', // path to tslint.json of your project
            },
        ],
        'dcr/only-import-below': [
            'warn',            
            {
                allowedImports: [
                    "react",
                    "emotion",
                    "jsdom",
                    "curlyquotes",
                    "react-dom",
                    "@guardian/pasteup",
                    "@frontend/lib/",
                    "@frontend/amp/lib/",
                    "@testing-library",
                    "@root/packages/frontend/amp/lib/",
                    "@guardian/src-foundations"
                ]
            }
        ]
    },
};
