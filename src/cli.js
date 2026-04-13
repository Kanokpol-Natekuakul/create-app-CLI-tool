import { Command } from 'commander';
import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs/promises';
import chalk from 'chalk';
import { Scaffolder } from './generator/scaffolder.js';
import { installDependencies } from './installer/installer.js';
import { initGit, commitGit } from './installer/git.js';
import { logger } from './utils/logger.js';

const STACKS = {
  react: { name: 'React + Vite', value: 'react' },
  vue: { name: 'Vue + Vite', value: 'vue' },
  node: { name: 'Node.js + Express', value: 'node' },
};

const ADDONS = {
  typescript: { name: 'TypeScript', value: 'typescript' },
  tailwind: { name: 'Tailwind CSS', value: 'tailwind' },
  eslint: { name: 'ESLint', value: 'eslint' },
  prettier: { name: 'Prettier', value: 'prettier' },
  husky: { name: 'Husky & Lint-Staged', value: 'husky' },
  docker: { name: 'Docker (Dockerfile & Compose)', value: 'docker' },
};

export async function run() {
  const program = new Command();

  program
    .name('create-app')
    .description(chalk.cyan('🚀 CLI Tool จัดการโปรเจคอัตโนมัติ — scaffold projects in seconds'))
    .version('1.0.0')
    .argument('[project-name]', 'Name of the project to create')
    .option('--react', 'Use React + Vite stack')
    .option('--vue', 'Use Vue + Vite stack')
    .option('--node', 'Use Node.js + Express stack')
    .option('--ts', 'Use TypeScript')
    .option('--tailwind', 'Add Tailwind CSS')
    .option('--eslint', 'Add ESLint')
    .option('--prettier', 'Add Prettier')
    .option('--husky', 'Add Husky & Lint-Staged')
    .option('--docker', 'Add Docker Setup')
    .option('--git', 'Initialize a git repository')
    .option('--pm <package-manager>', 'Choose package manager (npm, yarn, pnpm, bun)')
    .option('--open', 'Open project in default editor (VSCode)')
    .option('--no-install', 'Skip dependency installation')
    .action(async (projectName, options) => {
      try {
        await createProject(projectName, options);
      } catch (err) {
        logger.error(err.message);
        process.exit(1);
      }
    });

  await program.parseAsync(process.argv);
}

async function createProject(projectNameArg, options) {
  // ─── Banner ──────────────────────────────────────────
  logger.welcome();

  // ─── Resolve project name ───────────────────────────
  let projectName = projectNameArg;
  if (!projectName) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Project name:',
        default: 'my-app',
        validate: (input) => {
          if (!/^[a-zA-Z0-9_-]+$/.test(input)) {
            return 'Project name can only contain letters, numbers, hyphens, and underscores';
          }
          return true;
        },
      },
    ]);
    projectName = answers.projectName;
  }

  // ─── Resolve stack ──────────────────────────────────
  let stackName = null;
  if (options.react) stackName = 'react';
  else if (options.vue) stackName = 'vue';
  else if (options.node) stackName = 'node';

  if (!stackName) {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'stack',
        message: 'Choose a stack:',
        choices: Object.values(STACKS),
      },
    ]);
    stackName = answers.stack;
  }

  // ─── Resolve addons ─────────────────────────────────
  const addons = [];
  if (options.ts) addons.push('typescript');
  if (options.tailwind) addons.push('tailwind');
  if (options.eslint) addons.push('eslint');
  if (options.prettier) addons.push('prettier');
  if (options.husky) {
    addons.push('husky');
    options.git = true; // Husky needs Git
  }
  if (options.docker) addons.push('docker');

  if (addons.length === 0 && !options.ts && !options.tailwind && !options.eslint && !options.prettier && !options.husky && !options.docker) {
    // Only prompt if no addon flags were explicitly used
    const hasAnyFlag = options.react || options.vue || options.node;
    if (!hasAnyFlag) {
      const answers = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'addons',
          message: 'Select add-ons:',
          choices: Object.values(ADDONS),
        },
        {
          type: 'confirm',
          name: 'git',
          message: 'Initialize a git repository?',
          default: true,
        }
      ]);
      addons.push(...answers.addons);
      options.git = answers.git;
    }
  }

  // ─── Resolve Package Manager ────────────────────────
  let packageManager = options.pm;
  if (!packageManager && options.install !== false) {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'pm',
        message: 'Which package manager do you want to use?',
        choices: [
          { name: 'npm', value: 'npm' },
          { name: 'yarn', value: 'yarn' },
          { name: 'pnpm', value: 'pnpm' },
          { name: 'bun', value: 'bun' }
        ],
        default: 'npm'
      }
    ]);
    packageManager = answers.pm;
  }

  // ─── Confirm ────────────────────────────────────────
  const projectPath = path.resolve(process.cwd(), projectName);

  // Check if directory exists
  try {
    await fs.access(projectPath);
    const { overwrite } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: chalk.yellow(`"${projectName}" already exists. Overwrite?`),
        default: false,
      },
    ]);
    if (!overwrite) {
      logger.info('Aborted.');
      process.exit(0);
    }
    await fs.rm(projectPath, { recursive: true, force: true });
  } catch {
    // Directory doesn't exist — that's fine
  }

  // ─── Summary ────────────────────────────────────────
  logger.title(`Creating ${projectName}`);
  console.log(chalk.white('  📦 Stack:   ') + chalk.cyan(STACKS[stackName].name));
  if (addons.length > 0) {
    console.log(chalk.white('  🔧 Add-ons: ') + chalk.cyan(addons.join(', ')));
  }
  console.log(chalk.white('  📂 Path:    ') + chalk.gray(projectPath));
  console.log('');

  // ─── Scaffold ───────────────────────────────────────
  const scaffolder = new Scaffolder(projectName, projectPath, stackName, addons);
  await scaffolder.scaffold();

  // ─── Git Init ───────────────────────────────────────
  if (options.git) {
    await initGit(projectPath);
  }

  // ─── Install dependencies ───────────────────────────
  if (options.install !== false) {
    console.log('');
    await installDependencies(projectPath, packageManager);
  }

  // ─── Git Commit ───────────────────────────────────────
  if (options.git) {
    console.log('');
    await commitGit(projectPath);
  }

  // ─── Done ───────────────────────────────────────────
  logger.done(projectName, packageManager);

  // ─── Auto Open Editor ─────────────────────────────
  let openEditor = options.open;
  if (openEditor === undefined) {
    console.log('');
    const answer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'open',
        message: 'Do you want to open the project in VSCode now?',
        default: true
      }
    ]);
    openEditor = answer.open;
  }

  if (openEditor) {
    try {
      const { exec } = await import('child_process');
      const util = await import('util');
      const execAsync = util.promisify(exec);
      logger.info('Opening VSCode... 💻');
      await execAsync('code .', { cwd: projectPath });
      process.exit(0);
    } catch {
      logger.warn('Failed to open VSCode. Make sure "code" is in your system PATH.');
    }
  }
}
