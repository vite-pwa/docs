import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    jsx: true,
    stylistic: true,
    toml: {
      overrides: {
        'toml/indent': 'off',
        'toml/padding-line-between-tables': 'off',
        'toml/tables-order': 'off',
      },
    },
    markdown: true,
  },
  {
    ignores: [
      'build',
      'dist/',
      'dev-dist/',
      'node_modules/',
      '*.d.ts',
      '!.vitepress',
      '.vitepress/dist/*',
      '.vitepress/cache/deps/*.*',
      // Ignore non-JS/TS code blocks in markdown files
      '**/*.md/*.bash',
      '**/*.md/*.sh',
      '**/*.md/*.json',
      '**/*.md/*.html',
      '**/*.md/*.yml',
      '**/*.md/*.yaml',
      '**/*.md/*.svelte',
    ],
  },
  {
    files: [
      '**/*.md/*.js',
      '**/*.md/*.ts',
      '**/*.md/*.jsx',
      '**/*.md/*.tsx',
      '**/*.md/*.json',
      '**/*.md/*.html',
      '**/*.md/*.svelte',
    ],
    rules: {
      '@stylistic/js/no-trailing-spaces': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/semi': 'off',
      '@typescript-eslint/quotes': 'off',
      'n/handle-callback-err': 'off',
      'no-restricted-globals': 'off',
      'no-restricted-syntax': 'off',
      'no-labels': 'off',
      'perfectionist/sort-named-imports': 'off',
      'perfectionist/sort-imports': 'off',
      'style/semi': 'off',
      'style/no-mixed-spaces-and-tabs': 'off',
      'style/no-tabs': 'off',
      'style/indent': 'off',
      'style/jsx-wrap-multilines': 'off',
      'style/jsx-curly-newline': 'off',
      'style/jsx-closing-tag-location': 'off',
      'style/jsx-one-expression-per-line': 'off',
    },
  },
  {
    files: [
      '*.d.ts',
    ],
    rules: {
      'unused-imports/no-unused-vars': 'off',
      'eslint-comments/no-unlimited-disable': 'off',
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
)
