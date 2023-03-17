module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "plugin:@typescript-eslint/recomended",
        "prettier/@typescript-eslint",
        "plugin:prettier/recomended",
    ],
    parseOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {},
}