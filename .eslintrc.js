module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'prettier',
    'simple-import-sort',
    'sort-keys-fix',
    'detox',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.e2e.js'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
          },
        ],
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'sort-keys-fix/sort-keys-fix': 'warn',
        'react/jsx-sort-props': 'error',
        'react-hooks/exhaustive-deps': 'off',
      },
      env: {
        jest: true,
        'detox/detox': true,
        'jest/globals': true,
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {},
      'babel-plugin-root-import': {
        rootPathSuffix: './src',
        rootPathPrefix: '@/',
      },
    },
  },
};
