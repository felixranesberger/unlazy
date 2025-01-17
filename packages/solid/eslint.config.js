import solidPlugin from 'eslint-plugin-solid'
import * as tsParser from '@typescript-eslint/parser'
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: false,
    ignores: ['tsconfig.json'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      solid: solidPlugin,
    },
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      ...solidPlugin.configs.recommended.rules,
    },
  },
)
