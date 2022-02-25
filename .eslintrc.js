module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:vue/essential', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    'no-undef': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/no-side-effects-in-computed-properties': 'off',
    'no-use-before-define': 'off',
    'no-param-reassign': 'off',
    'comma-dangle': 'off',
    'operator-linebreak': 'off',
    'no-shadow': 'off',
    'no-plusplus': 'off',
    'no-console': 'off',
  },
};
