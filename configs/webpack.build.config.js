const validate = require('webpack-validator');
const merge = require('webpack-merge');

const { PATHS, pkg } = require('./base-config');

const { clean, common, extractBundle, extractCSS, outputProd, minify, 
  purifyCSS, setFreeVar } = require('./webpack.base.config'); 

const options = { host: 'localhost', port: 5050 };
const config = merge(clean(PATHS.build),
                     setFreeVar('process.env.NODE_ENV', 'production'),
                     common(PATHS), 
                     outputProd(PATHS),
                     extractBundle({name: 'vendor', 
                      entries: Object.keys(pkg.dependencies)}),
                     minify(),                     
                     extractCSS(PATHS.app),
                     purifyCSS([PATHS.app]));

module.exports = validate(config);

