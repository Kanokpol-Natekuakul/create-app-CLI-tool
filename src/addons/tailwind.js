/**
 * Tailwind CSS Addon
 */
export function getConfig({ stackName }) {
  const isVite = stackName === 'react' || stackName === 'vue';

  return {
    name: 'tailwind',
    devDependencies: {
      'tailwindcss': '^4.1.4',
      ...(isVite ? { '@tailwindcss/vite': '^4.1.4' } : {}),
    },
    configFiles: {
      'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
`,
    },
  };
}
