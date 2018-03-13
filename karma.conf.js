module.exports = function runTests(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      './node_modules/jquery/dist/jquery.min.js',
      './tests/coverage/index.js',
      './tests/**/*.spec.js',
    ],
    exclude: [],
    preprocessors: {
      './tests/**/*.spec.js': ['istanbul'],
    },
    reporters: [
      'progress',
      'coverage',
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: [
      //'Firefox',
      'PhantomJS2',
    ],
    singleRun: true,
    concurrency: Infinity,
  });
};
