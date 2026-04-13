/**
 * Custom Template Engine
 * 
 * Supports:
 *   {{variable}} or {{ variable }}  — Variable interpolation
 *   {{#if condition}}...{{/if}}     — Conditional blocks
 *   {{#unless condition}}...{{/unless}} — Negated conditionals
 *   {{#each items}}...{{/each}}     — Loop blocks ({{this}} for current item)
 *   {{upper variable}}              — Uppercase transform
 *   {{lower variable}}              — Lowercase transform
 *   {{capitalize variable}}         — Capitalize first letter
 *
 *   JSX-safe syntax: use tpl:variable in JSX comment braces
 */

export class TemplateEngine {
  constructor(context = {}) {
    this.context = context;
  }

  /**
   * Process a template string with the given context
   */
  render(template) {
    let result = template;

    // Process JSX-safe {/* tpl:variable */} syntax
    result = this._processJsxPlaceholders(result);

    // Process {{#each}} blocks
    result = this._processEach(result);

    // Process {{#if}} blocks
    result = this._processIf(result);

    // Process {{#unless}} blocks
    result = this._processUnless(result);

    // Process transform helpers
    result = this._processTransforms(result);

    // Process simple variable interpolation {{ variable }}
    result = this._processVariables(result);

    return result;
  }

  /**
   * Resolve a dotted path against the context
   */
  _resolve(path, localCtx = null) {
    const ctx = { ...this.context, ...localCtx };
    return path.split('.').reduce((obj, key) => {
      if (obj == null) return undefined;
      return obj[key];
    }, ctx);
  }

  /**
   * {{#each items}}...{{/each}}
   */
  _processEach(template) {
    const regex = /\{\{#each\s+(\w+)\}\}([\s\S]*?)\{\{\/each\}\}/g;
    return template.replace(regex, (_, key, body) => {
      const arr = this._resolve(key);
      if (!Array.isArray(arr)) return '';
      return arr.map((item, index) => {
        const localCtx = {
          this: item,
          '@index': index,
          '@first': index === 0,
          '@last': index === arr.length - 1,
        };
        let rendered = body;
        // Replace {{this}} with current item
        rendered = rendered.replace(/\{\{this\}\}/g, String(item));
        // Replace {{@index}} etc
        rendered = rendered.replace(/\{\{@index\}\}/g, String(index));
        return rendered;
      }).join('');
    });
  }

  /**
   * {{#if condition}}...{{/if}}
   * {{#if condition}}...{{else}}...{{/if}}
   */
  _processIf(template) {
    const regex = /\{\{#if\s+(\w[\w.]*)\}\}([\s\S]*?)\{\{\/if\}\}/g;
    return template.replace(regex, (_, key, body) => {
      const value = this._resolve(key);
      const parts = body.split('{{else}}');
      if (value) {
        return parts[0];
      } else {
        return parts[1] || '';
      }
    });
  }

  /**
   * {{#unless condition}}...{{/unless}}
   */
  _processUnless(template) {
    const regex = /\{\{#unless\s+(\w[\w.]*)\}\}([\s\S]*?)\{\{\/unless\}\}/g;
    return template.replace(regex, (_, key, body) => {
      const value = this._resolve(key);
      return value ? '' : body;
    });
  }

  /**
   * {{upper var}}, {{lower var}}, {{capitalize var}}
   */
  _processTransforms(template) {
    const transforms = {
      upper: (v) => String(v).toUpperCase(),
      lower: (v) => String(v).toLowerCase(),
      capitalize: (v) => String(v).charAt(0).toUpperCase() + String(v).slice(1),
    };

    for (const [name, fn] of Object.entries(transforms)) {
      const regex = new RegExp(`\\{\\{${name}\\s+(\\w[\\w.]*)\\}\\}`, 'g');
      template = template.replace(regex, (_, key) => {
        const value = this._resolve(key);
        return value != null ? fn(value) : '';
      });
    }

    return template;
  }

  /**
   * Variable interpolation with optional spaces: {{ variable }} or {{variable}}
   */
  _processVariables(template) {
    return template.replace(/\{\{\s*(\w[\w.]*)\s*\}\}/g, (_, key) => {
      const value = this._resolve(key);
      return value != null ? String(value) : '';
    });
  }

  // JSX-safe interpolation: {/* tpl:variableName */}
  // Use in .jsx/.tsx files where {{ }} conflicts with JS expressions
  _processJsxPlaceholders(template) {
    return template.replace(/\{\/\*\s*tpl:(\w[\w.]*)\s*\*\/\}/g, (_, key) => {
      const value = this._resolve(key);
      return value != null ? String(value) : '';
    });
  }
}

