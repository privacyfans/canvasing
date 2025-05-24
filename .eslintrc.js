module.exports = {
  extends: ['next/core-web-vitals', 'eslint:recommended', 'prettier'],
  rules: {
    '@next/next/no-html-link-for-pages': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'react/jsx-key': 'error',
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
}
