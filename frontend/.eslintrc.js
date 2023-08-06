// turn off the rule completely
const OFF = 0;
// turns the rule on but won't make the linter fail
const WARN = 1;
// turns the rule on and make the linter fail
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    camelcase: OFF,
    /*
    If a JS object has a setter for a property, make sure there exists a getter property to read it. Reverse may not be true.
    */
    'accessor-pairs': OFF,
    indent: [ERROR, 2],
    'linebreak-style': [ERROR, 'unix'],
    /*
    allow use of single quotes wherever possible
    avoidEscape: var double = "a string containing 'single' quotes"; is correct
    */
    quotes: [
      ERROR,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    semi: [ERROR, 'always'],
    // allows omitting parens when there is only 1 arg
    'arrow-parens': [ERROR, 'as-needed'],
    // spacing before and after the arrow
    'arrow-spacing': [ERROR, { before: true, after: true }],
    /*
    One True Brace Style - opening brace of a block is placed on the same line as its corresponding statement or declaration. Like for func, if, try, loops
    */
    'brace-style': [ERROR, '1tbs'],

    'no-prototype-builtins': OFF,
    /*
    requires trailing commas when last prop is in a diff line than closing ] or },
    disallow trailing commas when last element is on the same line as a closing ] or }
    */
    'comma-dangle': [
      ERROR,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    // use dot notation whenever possible, like error on foo['bar']
    'dot-notation': ERROR,
    // requires end of line always
    'eol-last': ERROR,
    // enforce strict equality except when comparing with null literal
    eqeqeq: [ERROR, 'smart'],
    // prefer using double quotes in jsx whenever possible
    'jsx-quotes': [ERROR, 'prefer-double'],
    // allow spacing before and after keywords like func, if, loops
    'keyword-spacing': [ERROR, { after: true, before: true }],
    'lines-between-class-members': OFF,
    'max-classes-per-file': OFF,
    // no function declaration in nested blocks, such as inside if
    'no-inner-declarations': [ERROR, 'functions'],
    'no-multi-spaces': ERROR,
    // dont use with statement in js
    'no-restricted-syntax': [ERROR, 'WithStatement'],
    /*
    Shadowing is the process by which a local variable shares the same name as a variable in its containing scope. Eliminate shadowed variables declarations.
    */
    'no-shadow': OFF,
    'react/jsx-no-bind': OFF,
    // React and JSX
    // not use ={true} when passing truthy values as props
    'react/jsx-boolean-value': [ERROR, 'never'],
    'react/boolean-prop-naming': [
      ERROR,
      {
        rule: '^(is|has|should)[A-Z]([A-Za-z0-9]?)+',
      },
    ],
    'no-console': [OFF, { allow: ['warn', 'error'] }],
    /*
    Components without children can be self-closed to avoid unnecessary extra closing tag.
    */
    'import/prefer-default-export': OFF,
    'react/button-has-type': ERROR,
    // If someone wants to pass children, use <Component><h1>My data</h1></Component> instead of <Component children={<h1>My data</h1>} />
    'react/no-children-prop': ERROR,
    'react/self-closing-comp': ERROR,
    'react/no-unused-state': ERROR,
    // allow default values for unrequired props
    'react/default-props-match-prop-types': OFF,
    'react/jsx-filename-extension': [
      ERROR,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'no-magic-numbers': [
      WARN,
      {
        ignoreArrayIndexes: true,
        enforceConst: true,
        ignore: [0, 1],
      },
    ],
    complexity: [WARN, MAX_CYCLOMATIC_COMPLEXITY],
    'max-lines': [ERROR, MAX_LINES_PER_FILE],
    // disable the requirement of a return type in functions
    '@typescript-eslint/explicit-module-boundary-types': OFF,
    '@typescript-eslint/explicit-function-return-type': OFF,
    '@typescript-eslint/no-empty-function': WARN,
    '@typescript-eslint/no-empty-interface': [
      ERROR,
      {
        allowSingleExtends: true,
      },
    ],
    '@typescript-eslint/naming-convention': [
      ERROR,
      {
        selector: ['function'],
        format: ['strictCamelCase', 'PascalCase'],
      },
      {
        selector: 'variable',
        format: ['strictCamelCase', 'UPPER_CASE', 'PascalCase'],
      },
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'are', 'should', 'has', 'have', 'can', 'did', 'will'],
      },
      {
        selector: 'typeParameter',
        format: ['PascalCase'],
        prefix: ['T'],
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
        prefix: ['I'],
      },
      {
        selector: 'enum',
        format: ['PascalCase'],
        suffix: ['Enum'],
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
        suffix: ['Type'],
      },
    ],
    '@typescript-eslint/space-infix-ops': [ERROR, { int32Hint: false }],
    '@typescript-eslint/prefer-optional-chain': ERROR,
    '@typescript-eslint/array-type': [ERROR, { default: 'generic' }],
    '@typescript-eslint/consistent-indexed-object-style': [ERROR, 'record'],
    '@typescript-eslint/consistent-type-definitions': [ERROR, 'interface'],
    'no-restricted-imports': OFF,
  },
};
