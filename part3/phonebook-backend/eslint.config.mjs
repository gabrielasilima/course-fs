import globals from 'globals'
import pluginJs from '@eslint/js'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
      ecmaVersion: 'latest',
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      'indent': ['error', 2],
      'linebreak-style': ['error', 'windows'], // Use "unix" se estiver no Mac/Linux
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'no-console': 0,
    },
  },
  {
    // 3.22: Ignorar pastas específicas (Equivalente ao .eslintignore)
    ignores: ['dist/**', 'node_modules/**'],
  }
]