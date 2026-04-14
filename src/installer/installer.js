import { exec } from 'child_process';
import util from 'util';
import ora from 'ora';
import { logger } from '../utils/logger.js';

const execAsync = util.promisify(exec);

const ALLOWED_PM = ['npm', 'yarn', 'pnpm', 'bun'];

/**
 * Install dependencies using chosen package manager
 */
export async function installDependencies(projectPath, pm = 'npm') {
  // Security: validate package manager against whitelist to prevent command injection
  if (!ALLOWED_PM.includes(pm)) {
    logger.error(`Invalid package manager "${pm}". Allowed: ${ALLOWED_PM.join(', ')}`);
    return;
  }

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
