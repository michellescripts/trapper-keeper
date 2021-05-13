module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "plugin:react/recommended",
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
    },
    overrides: [
        {
            files: ['*.test.tsx', '*.test.ts'],
            rules: {
                '@typescript-eslint/ban-ts-ignore': 'off',
                '@typescript-eslint/no-non-null-assertion': 0,
                '@typescript-eslint/no-empty-function': 'off',
            }
        },
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                'react/prop-types': 'off',
                'react/display-name': 'off',
            }
        }
    ]
};
