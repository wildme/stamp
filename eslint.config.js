const {
    defineConfig,
} = require("eslint/config");

const globals = require("globals");
const react = require("eslint-plugin-react");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    "settings": {
        "react": {
            "version": "detect",
        },
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        "ecmaVersion": "latest",
        "sourceType": "module",
        parserOptions: {},
    },

    extends: compat.extends(
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
    ),

    plugins: {
        react,
    },

    "rules": {
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "no-prototype-builtins": "off",
        "no-unused-vars": "warn",
        "no-extra-semi": "warn",
    },
}, {
    languageOptions: {
        globals: {
            ...globals.node,
        },

        "sourceType": "script",
        parserOptions: {},
    },

    files: ["**/.eslintrc.{js,cjs}"],
}]);
