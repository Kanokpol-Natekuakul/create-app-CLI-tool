export function getConfig({ hasAddon }) {
  const deps = {
    husky: '^9.0.11',
    'lint-staged': '^15.2.2',
  };

  const lintStaged = {};
  if (hasAddon.eslint && hasAddon.prettier) {
    lintStaged['*.{js,jsx,ts,tsx,vue}'] = ['eslint --fix', 'prettier --write'];
    lintStaged['*.{json,md,css,html}'] = ['prettier --write'];
  } else if (hasAddon.eslint) {
    lintStaged['*.{js,jsx,ts,tsx,vue}'] = ['eslint --fix'];
  } else if (hasAddon.prettier) {
    lintStaged['*'] = ['prettier --write'];
  } else {
    lintStaged['*'] = ['echo "No linter/formatter configured"'];
  }

  return {
    devDependencies: deps,
    scripts: {
      prepare: "husky"
    },
    configFiles: {
      '.lintstagedrc': lintStaged,
      '.husky/pre-commit': `#!/usr/bin/env sh\n. "$(dirname -- "$0")/_/husky.sh"\n\nnpx lint-staged\n`
    }
  };
}
