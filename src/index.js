import webpack from 'webpack';
import stonejs from 'stonejs-tools';

class WebpackStonejs {
  constructor(options = {
    // Source files (js/html)
    src: ['src/**/*.js', 'src/*.html'],
    // Translation template (.pot)
    pot: 'locales/catalog.pot',
    // Localised translation files (.po)
    po: 'locales/*.po',
    // Output folder (or file if the `merge` option is set to true)
    output: 'json/catalog.json',
    options:{},
  }) {
    this.src = options.src;
    this.pot = options.pot;
    this.po = options.po;
    this.output = options.output;
    this.options = options.options;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'Webpack Stonejs',
      (compilation, callback) => {
        let src = this.src;
        if (src && !Array.isArray(src)) {
          src = [src];
        }
        const pot = this.pot;
        let po = this.po;
        if (po && !Array.isArray(po)) {
          po = [po];
        }
        const output = this.output;

        const options = Object.assign({
            // Do not output logs if setted to `true` (default: false)
            quiet: false,
            // List of the translation functions (default: ['_', 'gettext', 'lazyGettext'])
            functions: ['_', 'gettext', 'lazyGettext'],
            // Merge all locales into a single file if setted to true (default: false)
            merge: true,
            // Output format (js or json, default: 'json')
            format: 'json'
        }, this.options);

        function extract() {
          if (src && pot) {
            console.log("Extracting strings...");
            stonejs.extract(src, pot, options, function (error) {
              if (error) {
                compilation.errors.push(error);
                callback();
              }
              else {
                update();
              }
            });
          } else {
            update();
          }
        }

        function update() {
          if (pot && po) {
            console.log("Updating po files...");
            stonejs.update(po, pot, options, function (error) {
              if (error) {
                compilation.errors.push(error);
                callback();
              }
              else {
                build();
              }
            });
          } else {
            build();
          }
        }

        function build() {
          if (po && output) {
            console.log("Building catalogs...");
            stonejs.build(po, output, options, function (error) {
              if (error) {
                compilation.errors.push(error);
                callback();
              }
              else {
                callback();
              }
            });
          } else {
            callback();
          }
        }

        extract();
      }
    );
  }
}

export default WebpackStonejs;
