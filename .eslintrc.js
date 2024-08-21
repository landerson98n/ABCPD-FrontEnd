module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": ["eslint:all"],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [".eslintrc.{js,cjs}"],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "react"
    ],
    "rules": {
        "linebreak-style": "off",
        "strict": "off",
        "max-statements": "off",
        "sort-keys": "off",
        "max-lines-per-function": "off",
        "func-style": "off",
        "sort-imports": "off",
        "require-await": "off",
        "no-nested-ternary": "off",
        "guard-for-in": "off",
        "radix": "off",
        "sort-vars": "off",
        "no-unused-vars": "off",
        "new-cap": "off",
        "no-ternary": "off",
        "max-lines": "off",
        "id-length": "off",
        "no-plusplus": "off",
        "prefer-named-capture-group": "off",
        "require-unicode-regexp": "off",
        "no-use-before-define": "off",
        "no-magic-numbers": "off",
        "max-len": "off",
        "one-var": "off",
        "eqeqeq": "off",
        "no-undef": "off",
        "no-constant-binary-expression": "off",
        "no-redeclare": "off",
        "no-shadow": "off",
        "init-declarations": "off",
        "no-undefined": "off",
        "consistent-return": "off",
        "array-callback-return": "off",
        "no-mixed-operators": "off",
        "no-unused-expressions": "off",
        "no-empty-function": "off",
        "complexity": "off",
        "no-negated-condition": "off",
        "no-confusing-arrow": "off",
        "object-curly-spacing": "off",
        "space-before-function-paren": "off",
        "no-trailing-spaces": "off",
        "indent": "off"
    }
};
