module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-restricted-syntax': 0,
    'react/destructuring-assignment': 0,
    'prefer-destructuring': 0,
    'import/no-unresolved': 0,
    'import/no-webpack-loader-syntax': 0,
    'no-underscore-dangle': 0,
    'react/prop-types': 0,
    'react/jsx-wrap-multilines': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'global-require': 0,
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'prettier/prettier': 0,
    'linebreak-style': 0,
    'import/no-extraneous-dependencies': 0,
    'react/no-array-index-key': 0,
    'array-callback-return': 0,
    'import/extensions': 0,
    'no-use-before-define': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx', 'ts'] }],
    'no-shadow': 0,
  },
};
