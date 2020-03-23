const buble = require('@rollup/plugin-buble');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const cleanup = require('rollup-plugin-cleanup');

const autoprefixer = require('autoprefixer');
const scss = require('postcss-scss');
const base64 = require('postcss-base64');

/* eslint import/no-extraneous-dependencies: 0 */
module.exports = function configuration(confs = {}) {
  const plugins = [
    postcss({
      parser: scss,
      plugins: [
        base64({
          extensions: ['.png'],
          root: './src/',
        }),
        autoprefixer({ add: true }),
      ],
    }),
    resolve({
      main: true,
      jsnext: true,
      module: true,
      include: ['./lib/**/*.{js,jsx}', './node_modules/**/*.{js,jsx}'],
      browser: true,
    }),
    commonjs({
      include: ['node_modules/**', 'lib/**'],
    }),
    buble({
      objectAssign: 'jquery.extend',
    }),
    cleanup({
      exclude: './lib',
    }),
  ];

  return {
    external: ['jquery'],
    input: 'lib/index.js',
    plugins,
  };
};
