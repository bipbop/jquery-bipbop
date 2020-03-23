const _ = require('lodash');
const path = require('path');
const gulp = require('gulp');
const { rollup } = require('rollup');
const jsdoc = require('gulp-jsdoc3');

const rollupGenerator = require('./utils/rollup-generator');
const pkg = require('./package.json');

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

gulp.task('pack:cjs', () => rollupBundle(rollupGenerator()).then(customizedBundler('cjs', path.join(__dirname, pkg.main))));
gulp.task('pack:umd', () => rollupBundle(rollupGenerator({ browser: true })).then(customizedBundler('umd', path.join(__dirname, pkg.browser))));

gulp.task('pack:dist', gulp.series('pack:umd', 'pack:cjs'));


gulp.task('jsdoc', gulp.series('pack:dist', () => gulp
  .src(['README.md', './index.js'], { read: false })
  .pipe(jsdoc())));

gulp.task('deploy', gulp.series('pack:dist'));
gulp.task('default', gulp.series('pack:dist'));
