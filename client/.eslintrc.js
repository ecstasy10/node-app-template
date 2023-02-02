module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/base',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended'
  ],
  rules: {
    'array-bracket-spacing': [ 'error', 'always' ],
    'arrow-spacing': 'error',
    'constructor-super': 'error',
    'curly': 'error',
    'indent': [ 'error', 2,  { 'SwitchCase': 1, 'ignoredNodes': [ 'TemplateLiteral' ] } ],
    'keyword-spacing': 'error',
    'no-console': 0,
    'no-const-assign': 'error',
    'no-debugger': 0,
    'no-duplicate-imports': 'error',
    'no-multiple-empty-lines': [ 2, { 'max': 2, 'maxEOF': 1 } ],
    'no-this-before-super': 'error',
    'no-unreachable': 'error',
    'no-unused-vars': 0,
    'no-useless-escape': 0,
    'no-var': 'error',
    'object-curly-spacing': [ 'error', 'always' ],
    'one-var': [ 'error',  { 'var': 'never', 'let': 'never', 'const': 'never' } ],
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'quotes': [ 'error', 'single', { 'allowTemplateLiterals': true } ],
    'semi': [ 'error', 'always' ],
    'sort-imports': [ 'error', { 'ignoreDeclarationSort': true } ],
    'space-before-function-paren': 'error',
    'template-curly-spacing': [ 'off' ],
    'valid-typeof': 'error',
    'vue/no-mutating-props': 0,
    'vue/component-name-in-template-casing': [ 'error', 'PascalCase',
      {
        'ignores': [
          'router-link',
          'router-view',
          'transition'
        ]
      }
    ]
  },
  'plugins': [
    'vue'
  ]
};
