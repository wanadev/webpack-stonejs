/* globals describe, it, __dirname */
import fs from 'fs';
import path from 'path';

import WebpackStonejs from '../src/index';

function compareDirectory(actual, expected) {
  const files = fs.readdirSync(expected);

  for (const file of files) {
    const absoluteFilePath = path.resolve(expected, file);

    const stats = fs.lstatSync(absoluteFilePath);

    if (stats.isDirectory()) {
      compareDirectory(
        path.resolve(actual, file),
        path.resolve(expected, file)
      );
    } else if (stats.isFile()) {
      const content = fs.readFileSync(path.resolve(expected, file), 'utf8');
      const actualContent = fs.readFileSync(path.resolve(actual, file), 'utf8');

      expect(actualContent).toEqual(content);
    }
  }
}

class MockCompiler {
  constructor(options = {}) {
    this.hooks = {
      emit: {
        tapAsync: (plugin, fn) => {
          this.hooks.emit = fn;
        },
      },
      afterEmit: {
        tapAsync: (plugin, fn) => {
          this.hooks.afterEmit = fn;
        },
      },
    };

  }
}

describe('apply function', () => {
  const expectedDirectory = path.resolve(__dirname, 'case/expected');
  const outputDirectory = path.resolve(__dirname, 'case/json');
  const localesPoDirectory = path.resolve(__dirname, 'case/locales/*.po');

  // Ideally we pass in patterns and confirm the resulting assets
  const run = (opts) =>
    new Promise((resolve, reject) => {
      // Get a mock compiler to pass to plugin.apply
      const compiler = opts.compiler || new MockCompiler();

      new WebpackStonejs({
        po: [localesPoDirectory],
        output: outputDirectory + "/catalog.json",
      }).apply(compiler);

      // Call the registered function with a mock compilation and callback
      const compilation = Object.assign(
        {
          assets: {},
          errors: [],
          warnings: [],
        },
        opts.compilation
      );

      // Execute the functions in series
      return Promise.resolve()
        .then(
          () =>
            new Promise((res, rej) => {
              try {
                compiler.hooks.emit(compilation, res);
              } catch (error) {
                rej(error);
              }
            })
        )
        .then(() => {
          resolve(compilation);
        })
        .catch(reject);
    });

  describe('with simple string patterns', () => {
    it('can move multiple files', (done) => {
      run({})
        .then(() => compareDirectory(outputDirectory, expectedDirectory))
        .then(done)
        .catch(done);
    })
  });

});
