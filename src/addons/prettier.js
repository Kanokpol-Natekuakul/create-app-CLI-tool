/**
 * Prettier Addon
 */
export function getConfig() {
  return {
    name: 'prettier',
    devDependencies: {
      'prettier': '^3.4.2',
    },
    scripts: {
      'format': 'prettier --write .',
    },
    configFiles: {
      '.prettierrc': `{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true
}
`,
    },
  };
}
