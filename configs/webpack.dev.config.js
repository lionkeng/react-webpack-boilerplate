const validate = require('webpack-validator');
const merge = require('webpack-merge');

const { PATHS } = require('./base-config');

const { common, setFreeVar, setupCSS, devServer,
  outputDev } = require('./webpack.base.config'); 

const options = { host: 'localhost', port: 5050 };

const config = merge(common(PATHS), 
                     setFreeVar('process.env.NODE_ENV', 'development'),
                     outputDev(PATHS),
                     setupCSS(PATHS.app),
                     devServer(options));

module.exports = validate(config);

