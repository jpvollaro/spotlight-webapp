// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const puppeteer = require('puppeteer');
process.env.CHROMIUM_BIN = puppeteer.executablePath();

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-html-detailed-reporter'),
      require('karma-scss-preprocessor')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'coverage'),
      dir: require('path').join(__dirname, 'coverage'), reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    
    reporters: config.angularCli && config.angularCli.codeCoverage
    ? ['progress', 'coverage-istanbul', 'htmlDetailed']
    : ['progress', 'htmlDetailed'],
    htmlDetailed: {
      useHostedBootstrap: true,
      splitResults: false,
      autoReload: false,
      showSuccess: true,
      showFailed: true,
      showSkipped: true
    },
    port: 9876,
    colors: true,
    browserNoActivityTimeout: 60000,
    captureTimeout: 60000,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless_custom'],
    customLaunchers: {
      'ChromeHeadless_custom': {
        base: 'Chromium',
        flags: [
          // We must disable the Chrome sandbox when running Chrome inside Docker (Chrome's sandbox needs
          // more permissions than Docker allows by default)
          // Also: https://github.com/GoogleChrome/puppeteer/issues/560
          '--no-sandbox',
          '--headless',
          '--disable-setuid-sandbox',
          '--remote-debugging-port=9222',
          '--disable-gpu',
        ],
        debug: true
      },
    },
    singleRun: true
  });
};
