/**
 * ESLint Addon
 */
export function getConfig({ stackName }) {
  const isReact = stackName === 'react';
  const isVue = stackName === 'vue';

  const deps = {
    'eslint': '^9.17.0',
    '@eslint/js': '^9.17.0',
    'globals': '^15.14.0',
  };

  if (isReact) {
    deps['eslint-plugin-react-hooks'] = '^5.1.0';
    deps['eslint-plugin-react-refresh'] = '^0.4.16';
  }

  if (isVue) {
    deps['eslint-plugin-vue'] = '^9.32.0';
  }

  return {
    name: 'eslint',
    devDependencies: deps,
    scripts: {
      'lint': 'eslint .',
    },
    configFiles: {
      'eslint.config.js': isReact
        ? `import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2024,
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
];
`
        : isVue
          ? `import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';

export default [
  { ignores: ['dist'] },
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
];
`
          : `import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['node_modules'] },
  js.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.node },
    },
  },
];
`,
    },
  };
}
