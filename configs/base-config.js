// path-config.js
const path = require('path');

const pathElements = path.parse(__dirname);

module.exports = {
  PATHS: {
    app: path.resolve(pathElements.dir, 'app'),
    build: path.resolve(pathElements.dir, 'build')
  },
  pkg: require(path.resolve(pathElements.dir, 'package.json')),
  appConfig: {
    title: 'My App',
  }
};


