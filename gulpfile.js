const _ = require('lodash');
const path = require('path');
const gulp = require('gulp');
const { rollup } = require('rollup');
const { Server } = require('karma');
const ghPages = require('gulp-gh-pages');
const jsdoc = require('gulp-jsdoc3');

const rollupGenerator = require('./utils/rollup-generator');
const pkg = require('./package.json');

/* eslint import/no-extraneous-dependencies: 0 */

function rollupBundle(config) {
  return rollup(_.omit(config, 'output'));
}

function customizedBundler(format, file) {
  return bundle => bundle.write({
    format,
    exports: 'default',
    name: 'bipbop',
    extend: true,
    globals: {
      jquery: '$',
    },
    file,
  });
}

gulp.task('jsdoc', ['pack:dist'], () => gulp
  .src(['README.md', './index.js'], { read: false })
  .pipe(jsdoc()));

gulp.task('deploy', ['jsdoc'], () => gulp.src('./docs/gen/**/*')
  .pipe(ghPages()));

gulp.task('pack:test', () => rollupBundle(rollupGenerator({ istanbul: true }))
  .then(customizedBundler('umd', path.join(__dirname, 'tests', 'coverage', 'index.js'))));
gulp.task('pack:cjs', () => rollupBundle(rollupGenerator()).then(customizedBundler('cjs', path.join(__dirname, pkg.main))));
gulp.task('pack:umd', () => rollupBundle(rollupGenerator()).then(customizedBundler('umd', path.join(__dirname, pkg.browser))));

gulp.task('pack:dist', ['pack:umd', 'pack:cjs']);

gulp.task('server', ['pack:test'], cb => new Server({
  configFile: `${__dirname}/karma.conf.js`,
  singleRun: false,
  autoWatch: true,
}, cb).start());

gulp.task('listener', () => gulp.watch('lib/**/*.js', ['pack:test']));
gulp.task('watch', ['server', 'listener']);
gulp.task('default', ['pack:test', 'pack:dist']);
