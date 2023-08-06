// turn off the rule completely
const OFF = 0;
// turns the rule on but won't make the linter fail
const WARN = 1;
// turns the rule on and make the linter fail
const ERROR = 2;

const MAX_CYCLOMATIC_COMPLEXITY = 100;
const MAX_LINES_PER_FILE = 300;

module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    'react',
    'jsx-a11y',
    'import',
    'prettier',
    '@typescript-eslint',
    'react-hooks',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // this setting is required to use rules that require type information
    project: './tsconfig.json',
  },

  // stop eslint from looking for a config file in parent folders
  root: true,
  rules: {
    'prettier/prettier': OFF,
    camelcase: OFF,
    // The prop validatin in react is disabled for now
    'react/prop-types': OFF,
    /*
    If a JS object has a setter for a property, make sure there exists a getter property to read it. Reverse may not be true.
    */
    'accessor-pairs': OFF,
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
    '@typescript-eslint/no-shadow': [ERROR],
    // note you must disable the base rule as it can report incorrect errors
    'no-use-before-define': OFF,
    '@typescript-eslint/no-use-before-define': [ERROR],
    // all named args must be used, and there must be no unused variables
    'no-unused-vars': [OFF],
    '@typescript-eslint/no-unused-vars': [ERROR, { args: 'after-used' }],
    'no-unused-expressions': OFF,
    '@typescript-eslint/no-unused-expressions': ERROR,
    // unnecessary to concatenate two strings together
    'no-useless-concat': ERROR,
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
    /*
    applied on blocks that don't begin on a new line
    ignore spacing b/w => and block - arrow-spacing
    ignore spacing b/w a keyword and a block - keyword-spacing
    */
    'space-before-blocks': ERROR,
    // always require a space b/w func name and (
    'space-before-function-paren': ERROR,
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
    'import/no-extraneous-dependencies': [
      ERROR,
      { devDependencies: ['**/*.stories.tsx'] },
    ],
    'react/button-has-type': ERROR,
    // If someone wants to pass children, use <Component><h1>My data</h1></Component> instead of <Component children={<h1>My data</h1>} />
    'react/no-children-prop': ERROR,
    'react/self-closing-comp': ERROR,
    'react/no-unused-state': ERROR,
    // allow default values for unrequired props
    'react/default-props-match-prop-types': OFF,
    // we need prop spreading; for icons especially
    'react/jsx-props-no-spreading': OFF,
    'react/jsx-filename-extension': [
      ERROR,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    // Checks rules of Hooks
    'react-hooks/rules-of-hooks': ERROR,
    // Checks effect dependencies
    'react-hooks/exhaustive-deps': WARN,
    'react/state-in-constructor': OFF,
    'react/require-default-props': OFF,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-magic-numbers': [
      WARN,
      {
        ignoreArrayIndexes: true,
        enforceConst: true,
        ignore: [0, 1],
      },
    ],
    'no-debugger': ERROR,
    'no-sparse-arrays': ERROR,
    'prefer-object-spread': ERROR,
    'valid-typeof': ERROR,
    'no-useless-constructor': OFF,
    '@typescript-eslint/no-useless-constructor': ERROR,
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
    '@typescript-eslint/no-restricted-imports': [
      ERROR,
      {
        name: 'react-redux',
        importNames: ['useSelector'],
        message: 'Use typed hooks `useTypedSelector` instead.',
      },
    ],
  },
  overrides: [
    {
      files: ['*.tsx', '*.ts'],
      rules: {
        eqeqeq: OFF,
      },
    },
  ],
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
