import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { TemplateEngine } from '../engine/templateEngine.js';
import { logger } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Scaffolder — generates project folder structure and processes templates
 */
export class Scaffolder {
  constructor(projectName, projectPath, stackName, addons = []) {
    this.projectName = projectName;
    this.projectPath = projectPath;
    this.stackName = stackName;
    this.addons = addons;
    this.engine = new TemplateEngine({
      projectName,
      stackName,
      addons,
      hasAddon: addons.reduce((acc, a) => ({ ...acc, [a]: true }), {}),
    });
  }

  /**
   * Load template.json for the chosen stack
   */
  async loadStackTemplate() {
    const templateDir = path.resolve(__dirname, '../../templates', this.stackName);
    const templateJsonPath = path.join(templateDir, 'template.json');
    const raw = await fs.readFile(templateJsonPath, 'utf-8');
    const templateConfig = JSON.parse(raw);
    return { templateConfig, templateDir };
  }

  /**
   * Generate the full project
   */
  async scaffold() {
    // 1. Create project directory
    await fs.mkdir(this.projectPath, { recursive: true });
    logger.step(1, 'Creating project directory...');

    // 2. Load stack template
    const { templateConfig, templateDir } = await this.loadStackTemplate();
    logger.step(2, `Loading ${this.stackName} template...`);

    // 3. Load addon configs
    const addonConfigs = await this._loadAddons();

    // 4. Build final package.json
    const packageJson = this._buildPackageJson(templateConfig, addonConfigs);
    await fs.writeFile(
      path.join(this.projectPath, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );
    logger.step(3, 'Generated package.json');

    // 5. Copy and process template files
    const filesDir = path.join(templateDir, 'files');
    await this._copyTemplateFiles(filesDir, this.projectPath);
    logger.step(4, 'Generated source files');

    // 5.5 Generate .gitignore
    await this._generateGitignore();

    // 6. Generate addon config files
    for (const addonConfig of addonConfigs) {
      if (addonConfig.configFiles) {
        for (const [filename, content] of Object.entries(addonConfig.configFiles)) {
          const processedContent = this.engine.render(
            typeof content === 'string' ? content : JSON.stringify(content, null, 2)
          );
          const fullPath = path.join(this.projectPath, filename);
          await fs.mkdir(path.dirname(fullPath), { recursive: true });
          await fs.writeFile(fullPath, processedContent);
        }
      }
    }
    if (addonConfigs.length > 0) {
      logger.step(5, 'Generated config files for: ' + this.addons.join(', '));
    }

    return packageJson;
  }

  /**
   * Load addon modules dynamically
   */
  async _loadAddons() {
    const addonConfigs = [];
    for (const addon of this.addons) {
      try {
        const addonModule = await import(`../addons/${addon}.js`);
        const config = addonModule.getConfig({
          projectName: this.projectName,
          stackName: this.stackName,
          addons: this.addons,
          hasAddon: this.addons.reduce((acc, a) => ({ ...acc, [a]: true }), {}),
        });
        addonConfigs.push(config);
      } catch (e) {
        logger.warn(`Addon "${addon}" not found, skipping...`);
      }
    }
    return addonConfigs;
  }

  /**
   * Merge template + addons into package.json
   */
  _buildPackageJson(templateConfig, addonConfigs) {
    const pkg = {
      name: this.projectName,
      version: '0.1.0',
      private: true,
      type: templateConfig.type || 'module',
      scripts: { ...templateConfig.scripts },
      dependencies: { ...templateConfig.dependencies },
      devDependencies: { ...templateConfig.devDependencies },
    };

    for (const addon of addonConfigs) {
      if (addon.dependencies) Object.assign(pkg.dependencies, addon.dependencies);
      if (addon.devDependencies) Object.assign(pkg.devDependencies, addon.devDependencies);
      if (addon.scripts) Object.assign(pkg.scripts, addon.scripts);
    }

    return pkg;
  }

  /**
   * Recursively copy + process template files
   */
  async _copyTemplateFiles(srcDir, destDir) {
    const entries = await fs.readdir(srcDir, { withFileTypes: true });

    for (const entry of entries) {
      let fileName = entry.name;
      const srcPath = path.join(srcDir, entry.name);

      // Transform filename if TypeScript is enabled
      const isTs = this.addons.includes('typescript');
      if (isTs && entry.isFile()) {
        if (fileName.endsWith('.jsx')) {
          fileName = fileName.replace('.jsx', '.tsx');
        } else if (fileName.endsWith('.js') && !fileName.includes('config')) {
          fileName = fileName.replace('.js', '.ts');
        }
      }

      const destPath = path.join(destDir, fileName);

      if (entry.isDirectory()) {
        await fs.mkdir(destPath, { recursive: true });
        await this._copyTemplateFiles(srcPath, destPath);
      } else {
        const raw = await fs.readFile(srcPath, 'utf-8');
        const processed = this.engine.render(raw);
        await fs.writeFile(destPath, processed);
      }
    }
  }

  /**
   * Generate default .gitignore
   */
  async _generateGitignore() {
    const gitignoreContent = `node_modules
dist
dist-ssr
*.local
.env
.DS_Store
coverage
`;
    await fs.writeFile(path.join(this.projectPath, '.gitignore'), gitignoreContent);
  }
}

