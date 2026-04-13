export function getConfig({ stackName }) {
  const isReact = stackName === 'react';
  const isVue = stackName === 'vue';
  const isNode = stackName === 'node';

  const deps = {
    typescript: '^5.2.2',
  };

  if (isReact) {
    deps['@types/react'] = '^18.2.15';
    deps['@types/react-dom'] = '^18.2.7';
  } else if (isNode) {
    deps['@types/node'] = '^20.0.0';
    deps['@types/express'] = '^4.17.21';
    deps['ts-node'] = '^10.9.2';
  }

  const tsconfig = {
    compilerOptions: {
      target: "ES2020",
      useDefineForClassFields: true,
      lib: ["ES2020", "DOM", "DOM.Iterable"],
      module: "ESNext",
      skipLibCheck: true,
      moduleResolution: "bundler",
      allowImportingTsExtensions: true,
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      strict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      noFallthroughCasesInSwitch: true
    },
    include: isVue ? ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"] : ["src"]
  };

  if (isReact) {
    tsconfig.compilerOptions.jsx = "react-jsx";
  }

  if (isNode) {
    tsconfig.compilerOptions.moduleResolution = "node";
    tsconfig.compilerOptions.outDir = "./dist";
    tsconfig.compilerOptions.noEmit = false;
    delete tsconfig.compilerOptions.allowImportingTsExtensions;
    delete tsconfig.compilerOptions.lib;
    delete tsconfig.include;
  }

  return {
    devDependencies: deps,
    configFiles: {
      'tsconfig.json': tsconfig,
    },
    scripts: isNode ? {
      dev: "ts-node server.ts",
      start: "ts-node server.ts",
      build: "tsc"
    } : {}
  };
}
