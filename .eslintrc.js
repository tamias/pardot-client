module.exports = {
  /* eslint-disable sort-keys */
  parser: '@typescript-eslint/parser',
  plugins: [
    'prettier',
    '@typescript-eslint',
    'import',
    'jest',
    'jest-formatting',
    'sort-imports-es6-autofix',
  ],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest-formatting/strict',
  ],
  /* eslint-enable sort-keys */
  rules: {
    '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
    'arrow-body-style': ['error', 'as-needed'],
    eqeqeq: 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.@(test|spec).@(js|ts)', '**/tests/lib/**/*.@(js|ts)'],
      },
    ],
    'import/no-named-as-default-member': 'error',
    'jest/expect-expect': ['error', { assertFunctionNames: ['expect*'] }],
    'no-console': 'error',
    'no-param-reassign': 'error',
    'no-unsafe-optional-chaining': 'error',
    'no-use-before-define': 'error',
    'prettier/prettier': ['error'],
    'sort-imports-es6-autofix/sort-imports-es6': ['error', { ignoreCase: true }],
    'sort-keys': ['warn', 'asc', { caseSensitive: false, natural: true }],
    yoda: 'error',
  },
  /* eslint-disable sort-keys */
  ignorePatterns: ['/lib'],
  env: {
    node: true,
    jest: true,
    es6: true,
  },
};
