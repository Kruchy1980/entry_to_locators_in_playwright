import eslintPluginPlaywright from 'eslint-plugin-playwright';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import pluginJs from '@eslint/js';

export default [
  { ignores: ['package-lock.json', 'playwright-report/**', 'test-results/**'] },
  { files: ['**/*.ts'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-console': 'error',
    },
  },
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
    },
  },
  eslintPluginPlaywright.configs['flat/recommended'],
  {
    rules: {
      'playwright/no-nested-step': 'off',
      'playwright/expect-expect': 'off',
    },
    settings: {
      playwright: {
        globalAliases: {
          test: ['setup'],
        },
      },
    },
  },
  eslintPluginPrettierRecommended,
];

// import eslintConfigPrettier from 'eslint-config-prettier';
// import playwright from 'eslint-plugin-playwright';
// import prettier from 'eslint-plugin-prettier';
// // import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
// import globals from 'globals';

// import eslintJsPlugin from '@eslint/js';
// import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
// import typescriptParser from '@typescript-eslint/parser';

// export default [
//   {
//     languageOptions: {
//       globals: {
//         ...globals.node,
//       },
//     },
//   },
//   {
//     files: ['**/*.ts'],
//     ignores: ['package-lock.json', 'playwright-report/**', 'test-results/**', 'tests/trash/**'],
//     languageOptions: {
//       ecmaVersion: 'latest',
//       sourceType: 'module',
//       parser: typescriptParser,
//       parserOptions: {
//         warnOnUnsupportedTypeScriptVersion: false,
//       },
//     },
//     plugins: {
//       prettier,
//       playwright,
//       typescriptEslintPlugin,
//     },
//     rules: {
//       ...eslintJsPlugin.configs.recommended.rules,
//       'no-console': 'warn',
//       'no-unused-vars': 'off',
//       ...typescriptEslintPlugin.configs['eslint-recommended'].rules,
//       'typescriptEslintPlugin/explicit-function-return-type': 'error',
//       'typescriptEslintPlugin/no-unused-vars': 'error',
//       ...playwright.configs.recommended.rules,
//       'playwright/no-nested-step': 'off',
//       'playwright/expect-expect': 'off',
//       ...prettier.configs.recommended.rules,
//       ...eslintConfigPrettier.rules,
//     },
//   },
//   // eslintPluginPrettierRecommended,
// ];
