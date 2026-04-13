import { exec } from 'child_process';
import util from 'util';
import ora from 'ora';
import { logger } from '../utils/logger.js';

const execAsync = util.promisify(exec);

export async function initGit(projectPath) {
  try {
    await execAsync('git --version');
    await execAsync('git init', { cwd: projectPath });
  } catch (error) {
    // Ignore
  }
}

export async function commitGit(projectPath) {
  const spinner = ora({
    text: 'Committing to git...',
    color: 'cyan'
  }).start();

  try {
    await execAsync('git add .', { cwd: projectPath });
    await execAsync('git commit -m "🚀 Initial commit from create-app"', { cwd: projectPath });

    const gradient = (await import('gradient-string')).default;
    spinner.succeed(gradient.pastel('Git repository initialized and committed! 🐙'));
  } catch (error) {
    spinner.fail('Failed to commit to git repository');
    logger.warn('Make sure git is installed to use this feature.');
  }
}
