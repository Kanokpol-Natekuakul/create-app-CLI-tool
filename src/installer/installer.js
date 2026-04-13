import { exec } from 'child_process';
import util from 'util';
import ora from 'ora';
import { logger } from '../utils/logger.js';

const execAsync = util.promisify(exec);

/**
 * Install dependencies using chosen package manager
 */
export async function installDependencies(projectPath, pm = 'npm') {
  const spinner = ora({
    text: 'Installing packages (this might take a while)...',
    spinner: 'bouncingBar',
    color: 'yellow'
  }).start();

  try {
    await execAsync(`${pm} install`, {
      cwd: projectPath,
      timeout: 120000, // 2 min timeout
    });
    // Dynamically import gradient-string for success message
    const gradient = (await import('gradient-string')).default;
    spinner.succeed(gradient.pastel('Dependencies installed successfully! 📦'));
  } catch (error) {
    spinner.fail(`Failed to install dependencies with ${pm}`);
    logger.error(error.message);
    logger.warn(`You can install dependencies manually by running: ${pm} install`);
  }
}
