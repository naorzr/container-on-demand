module.exports = {
  globals: {
    MyGlobal: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  plugins: ['@typescript-eslint', 'fp'],
  ignorePatterns: ['**/*.Dockerfile', '**/dv-scripts/*.js', '**/*.pac'],
  rules: {
    'fp/no-let': 'error',
    'fp/no-delete': 'error',
    'fp/no-loops': 'error',
    'fp/no-class': 'error',
    'fp/no-events': 'warn',
    'no-mixed-operators': 'off',
    'no-console': 'off',
    'no-undef': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-explicit-any': ['warn'],
    '@typescript-eslint/no-inferrable-types': ['off'],
    '@typescript-eslint/member-delimiter-style': ['off'],
    '@typescript-eslint/interface-name-prefix': ['off'],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/class-name-casing': ['off'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
};
