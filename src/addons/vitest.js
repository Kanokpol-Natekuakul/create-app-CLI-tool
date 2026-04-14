export function getConfig({ stackName }) {
  const isFrontend = stackName === 'react' || stackName === 'vue';

  const devDependencies = {
    vitest: '^1.4.0',
  };

  const scripts = {
    "test": "vitest run",
    "test:watch": "vitest"
  };

  let configFiles = {};

  if (stackName === 'react') {
    devDependencies['@testing-library/react'] = '^16.0.0';
    devDependencies['@testing-library/jest-dom'] = '^6.4.0';
    devDependencies['jsdom'] = '^24.0.0';

    configFiles['src/App.test.jsx'] = `import { render } from '@testing-library/react';\nimport App from './App';\nimport { describe, it, expect } from 'vitest';\n\ndescribe('App Component', () => {\n  it('renders without crashing', () => {\n    const { container } = render(<App />);\n    expect(container).toBeDefined();\n  });\n});`;
  } else if (stackName === 'vue') {
    devDependencies['@vue/test-utils'] = '^2.4.5';
    devDependencies['jsdom'] = '^24.0.0';

    configFiles['src/App.test.js'] = `import { describe, it, expect } from 'vitest';\n\ndescribe('App Component', () => {\n  it('renders properly', () => {\n    expect(true).toBe(true);\n  });\n});`;
  } else if (stackName === 'node') {
    configFiles['__tests__/server.test.js'] = `import { describe, it, expect } from 'vitest';\n\ndescribe('Server', () => {\n  it('should calculate math correctly', () => {\n    expect(1 + 1).toBe(2);\n  });\n});`;
  }

  // Inject vitest.config.js for frontend to configure JSDOM
  if (isFrontend) {
    configFiles['vitest.config.js'] = `import { defineConfig } from 'vitest/config';\n\nexport default defineConfig({\n  test: {\n    environment: 'jsdom',\n    globals: true,\n  },\n});`;
  }

  return {
    devDependencies,
    scripts,
    configFiles
  };
}
