const js = require("@eslint/js");
const reactPlugin = require("eslint-plugin-react");
const jestPlugin = require("eslint-plugin-jest");
const globals = require("globals");
const { off } = require("process");

// Safe helper to trim global names and handle undefined/null
function trimGlobals(input) {
  if (!input || typeof input !== "object") return {};
  return Object.fromEntries(
    Object.entries(input).map(([key, value]) => [key.trim(), value]),
  );
}
module.exports = [
  // Ignore build/config files
  {
    ignores: [
      "webpack.config.js",
      "node_modules/",
      "dist/",
      "eslint.config.js",
    ],
  },

  // Main JS/React files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...trimGlobals(globals.node),
        ...trimGlobals(globals.browser),
        ...trimGlobals(globals.es6),
        ...trimGlobals(jestPlugin.environments?.globals?.globals),
      },
    },
    plugins: {
      react: reactPlugin,
      jest: jestPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // Base JS rules
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,

      // Custom rules
      indent: ["error", 2],
      "linebreak-style": ["error", "unix"],
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "no-console": "error",
      "react/prop-types": "off",
      "linebreak-style": "off",

      // Jest rules
      ...jestPlugin.configs.recommended.rules,
    },
  },
];
