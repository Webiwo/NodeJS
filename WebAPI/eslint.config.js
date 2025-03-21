import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser, // keep browser globals
        ...globals.node, // keep Node.js globals
      },
    },
  },
  pluginJs.configs.recommended,
];
