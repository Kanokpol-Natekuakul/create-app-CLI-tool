import chalk from 'chalk';
import boxen from 'boxen';
import gradient from 'gradient-string';

export const logger = {
  info: (msg) => console.log(chalk.cyan('ℹ ') + msg),
  success: (msg) => console.log(chalk.green('✔ ') + msg),
  warn: (msg) => console.log(chalk.yellow('⚠ ') + msg),
  error: (msg) => console.log(chalk.red('✖ ') + msg),
  step: (num, msg) => console.log(chalk.magenta(`[${num}]`) + ' ' + chalk.white(msg)),

  welcome: () => {
    const text = gradient.pastel.multiline([
      '    🚀 create-app',
      ' Project scaffolding in seconds '
    ].join('\n'));

    console.log('\n' + boxen(text, {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'cyan',
      align: 'center'
    }));
  },

  title: (msg) => {
    console.log(boxen(chalk.bold.cyan(msg), {
      padding: { left: 2, right: 2, top: 0, bottom: 0 },
      margin: { top: 1, bottom: 1 },
      borderStyle: 'single',
      borderColor: 'magenta',
    }));
  },

  done: (projectName, pm = 'npm') => {
    const runCmd = pm === 'npm' ? 'npm run dev' : `${pm} run dev`;

    const text = [
      chalk.bold.green('🎉 Project created successfully!'),
      '',
      chalk.white('Next steps:'),
      chalk.cyan(`  cd ${projectName}`),
      chalk.cyan(`  ${runCmd}`)
    ].join('\n');

    console.log(boxen(text, {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'green'
    }));
  },
};
