export function getConfig({ hasAddon }) {
  const runTests = hasAddon.vitest ? '\n      - name: Run Tests\n        run: npm run test' : '';
  const runLint = hasAddon.eslint ? '\n      - name: Run Linter\n        run: npm run lint' : '';

  const ciContent = `name: CI Pipeline

on:
  push:
    branches: [ "main", "master" ]
  pull_request:
    branches: [ "main", "master" ]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build Project
        run: npm run build --if-present${runLint}${runTests}
`;

  return {
    configFiles: {
      '.github/workflows/ci.yml': ciContent
    }
  };
}
