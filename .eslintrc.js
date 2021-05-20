module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: 'module',
        project: './tsconfig.json',
    },
    extends: [
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:jest/recommended',
    ],
    plugins: ['react', '@typescript-eslint/eslint-plugin', 'jest', 'simple-import-sort', 'unused-imports'],
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    rules: {
        '@typescript-eslint/indent': ['error', 4, { SwitchCase: 1, ignoredNodes: ['JSXElement *', 'JSXElement'] }],
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',

        quotes: ['error', 'single'],
        'max-len': ['error', 120],
        'no-unused-vars': [
            'error',
            {
                args: 'all',
                ignoreRestSiblings: true,
                caughtErrors: 'all',
                varsIgnorePattern: '^ignored|_+$',
                argsIgnorePattern: '^_|props+$',
            },
        ],
        'padding-line-between-statements': [
            2,
            { blankLine: 'always', prev: 'function', next: '*' },
            { blankLine: 'always', prev: '*', next: 'function' },
            { blankLine: 'always', prev: 'export', next: '*' },
            { blankLine: 'always', prev: '*', next: 'export' },
            { blankLine: 'always', prev: 'multiline-const', next: '*' },
            { blankLine: 'always', prev: '*', next: 'return' },
        ],
        'no-console': 1,
        'no-dupe-keys': 1,
        'no-restricted-globals': 1,
        'lines-between-class-members': [2, 'always', { exceptAfterSingleLine: true }],
        'object-curly-spacing': ['error', 'always'],
        'simple-import-sort/imports': 'error',
        '@typescript-eslint/no-shadow': 0,

        'react/static-property-placement': 0,
        'react/destructuring-assignment': 0,
        'react/jsx-props-no-spreading': 0,
        'react/jsx-uses-react': 0,
        'react/jsx-uses-vars': 0,
        'react/sort-comp': [
            1,
            {
                order: [
                    'propTypes',
                    'defaultProps',
                    'contextType',
                    'contextTypes',
                    'static-variables',
                    'type-annotations',
                    'instance-variables',
                    'lifecycle',
                    'everything-else',
                    'render',
                ],
            },
        ],
        'react/self-closing-comp': [
            'error',
            {
                component: true,
                html: true,
            },
        ],
        'react/jsx-equals-spacing': 0,
        'react/prefer-stateless-function': 0,
        'react/jsx-no-bind': 0,

        'import/prefer-default-export': 0,
        'import/newline-after-import': 1,
        'unused-imports/no-unused-imports': 2,

    },
};
