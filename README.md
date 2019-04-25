# StoneJS Webpack Plugin

[![Build Status](https://travis-ci.org/wanadev/webpack-stonejs.svg?branch=master)](https://travis-ci.org/wanadev/webpack-stonejs)
[![NPM Version](http://img.shields.io/npm/v/webpack-stonejs.svg?style=flat)](https://www.npmjs.com/package/webpack-stonejs)
[![License](http://img.shields.io/npm/l/webpack-stonejs.svg?style=flat)](https://github.com/wanadev/webpack-stonejs/blob/master/LICENSE)
[![Dependencies](https://img.shields.io/david/wanadev/webpack-stonejs.svg?maxAge=2592000)]()
[![Dev Dependencies](https://img.shields.io/david/dev/wanadev/webpack-stonejs.svg?maxAge=2592000)]()
[![Greenkeeper badge](https://badges.greenkeeper.io/wanadev/webpack-stonejs.svg)](https://greenkeeper.io/)

This plugin uses [stonejs-tools](https://github.com/flozz/stonejs-tools) to extract po.

## Requirements

This module requires a minimum of Node v6.9.0 and Webpack v4.0.0.

## Getting Started

To begin, you'll need to install `webpack-stonejs`:

```console
$ npm install webpack-stonejs --save-dev
```

Then add the plugin to your `webpack` config. For example:

**webpack.config.js**

```js
const WebpackStonejs = require('webpack-stonejs');

module.exports = {
  plugins: [
    new WebpackStonejs(),
  ],
};
```

And run `webpack` via your preferred method.

### Options

#### options.quiet
Type: `Boolean
Default value: `false`

Do not output the stonejs-tools log.

#### options.functions
Type: `Array`
Default value: `['_', 'gettext', 'lazyGettext']`

List of the translation functions

#### options.merge
Type: `boolean`
Default value: `false`

Merge all locales into a single file.

#### options.format
Type: `String`
Values: `json` or `js`
Default value: `'json'`

Output format for the built catalog.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. 

## Release History
* **1.0.0:** First release

## License

[MIT](./LICENSE)
