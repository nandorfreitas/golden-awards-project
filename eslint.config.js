import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
		languageOptions: {
			globals: globals.browser,
			parserOptions: { sourceType: "module" },
			overrides: [
				{
					"env": {
						"jest": true
					}
				}
  		]}},
  pluginJs.configs.recommended,
];
