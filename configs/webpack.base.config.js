const webpack = require('webpack');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');

const { appConfig } = require('./base-config');

exports.clean = function(path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path], {
        // Without `root` CleanWebpackPlugin won't point to our
        // project and will fail to work.
        root: process.cwd()
      })
    ]
  };
}

// common config
exports.common = function(paths) {
  return {
    devtool: "source-map",
    entry: {
      app: paths.app
    },
    // Webpack config options on how to obtain modules
    resolve: {
      // When requiring, you don't need to add these extensions
      extensions: ['', '.js', '.jsx', '.md', '.txt']
    },
    output: {
      path: paths.build,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: appConfig.title,
        template: 'app/html-template.ejs'
      }),
    ],
    module: {
      loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: paths.app,
        exclude: /(node_modules|bower_components)/,
      },
      { test: /\.(gif|png|jpg)$/, 
        loader: 'url-loader?name=[path][name].[ext]&limit=8192'}, // inline base64 URLs for <=8k images, direct URLs for the rest
      { test: /\.json$/, loader: 'json' },
      { test: /\.(woff2?|svg)$/, loader: 'url?name=./assets/[hash].[ext]&limit=10000' },
      { test: /\.(ttf|eot)$/, loader: 'file?name=./assets/[hash].[ext]' },
      ],
    }
  }
}

exports.outputDev = function(bundleName) {
  return {
    output: {
      publicPath: '/',
      filename: `${bundleName}.[hash].js`
    },
  };
}

exports.outputProd = function() {
  return {
    output: {
      publicPath: '/',
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js'
    },    
  };
}

// dev server config
exports.devServer = function(options) {
  return {
    devServer: {
      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,

      // Unlike the cli flag, this doesn't set
      // HotModuleReplacementPlugin!
      hot: true,
      inline: true,

      // Display only errors to reduce the amount of output.
      // stats: 'errors-only',

      // Parse host and port from env to allow customization.
      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`.
      host: options.host, // Defaults to `localhost`
      port: options.port // Defaults to 8080
    },
    plugins: [
      // Enable multi-pass compilation for enhanced performance
      // in larger projects. Good default.
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      })
    ]
  };
}

exports.extractBundle = function(options) {
  const entry = {};
  entry[options.name] = options.entries;

  return {
    // Define an entry point needed for splitting.
    entry: entry,
    plugins: [
      // Extract bundle and manifest files. Manifest is
      // needed for reliable caching.
      new webpack.optimize.CommonsChunkPlugin({
        names: ['manifest', options.name],
        minChunks: 2
      })
    ]
  };
}

exports.extractCSS = function(paths) {
  return {
    module: {
      loaders: [
        // Extract CSS during build
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css!sass'),
          include: paths
        }
      ]
    },
    plugins: [
      // Output extracted CSS to a file
      new ExtractTextPlugin('[name].[chunkhash].css')
    ]
  };
}

exports.minify = function() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
         warnings: false
        },
        mangle: {
          // don't mangle filenames
          keep_fnames: true 
        }
      })
    ]
  };
}

exports.purifyCSS = function(paths) {
  return {
    plugins: [
      new PurifyCSSPlugin({
        basePath: process.cwd(),
        // `paths` is used to point PurifyCSS to files not
        // visible to Webpack. You can pass glob patterns
        // to it.
        paths: paths
      }),
    ]
  }
}

exports.setFreeVar = function(key, val) {
  const env = {};
  env[key] = JSON.stringify(val);
  return {
    plugins: [ 
      new webpack.DefinePlugin(env)
    ]
  };
}

exports.setupCSS = function(paths) {
  return {
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loaders: ["style", "css?sourceMap", "sass?sourceMap"],
          include: paths
        }
      ]
    }
  };
}




