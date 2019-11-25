module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
    node: true,
    mocha: true,
  },
  extends: 'airbnb-base',
  rules: {
    'max-len': 0,
    'no-bitwise': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'no-restricted-globals': 0,
    'class-methods-use-this': 0,
    'consistent-return': 0,
    'no-use-before-define': 0,
    'prefer-destructuring': 0,
    'global-require': 0,

    'indent': [2, 2, { SwitchCase: 1 }],
    'linebreak-style': [2, 'unix'],
    'no-trailing-spaces': 2,
    'eol-last': [2, 'always'],
    'no-multiple-empty-lines': [2, { max: 1 }],
    'no-unused-expressions': [2, { 'allowShortCircuit': true, 'allowTernary': true }],
    'object-curly-newline': [2, { 'multiline': true }],
    'no-plusplus': [2, { 'allowForLoopAfterthoughts': true }],
    'radix': [2, 'as-needed'],
    'quote-props': [2, 'as-needed', { 'numbers': true }],
    'semi': [2, 'never'],
    'camelcase': [2, { properties: 'never' }],
    'comma-dangle': [2, 'always-multiline'],
    'arrow-parens': [2, 'as-needed'],
    'space-before-function-paren': [
      2,
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],

    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
  },
  globals: {}
}
