const join = require('path').join;
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

exports.debug = function (isBuild, production) {
  if (isBuild) {
    return {
      debug: !production,
      devtool: production ? false : 'eval-source-map',
    };
  }

  return {
    debug: true,
    devtool: 'eval-source-map',
  };
};

exports.devServer = function (options) {
  return {
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },

    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: 'errors-only',
      host: options.host || '0.0.0.0',
      port: options.port || 8080,
    },
    plugins: [
      // Enable multi-pass compilation for enhanced performance in larger projects. Good default.
      new webpack.HotModuleReplacementPlugin({
        multiStep: true,
      }),
    ],
  };
};

exports.setupCSS = function (paths) {
  return {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css'],
          include: paths,
        },
      ],
    },
  };
};

exports.minify = function () {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
    ],
  };
};

exports.setFreeVariable = function (key, value) {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env),
    ],
  };
};

exports.clean = function (path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path], {
        root: join(__dirname, '../../../'),
      }),
    ],
  };
};

exports.extractCSS = function (paths) {
  return {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css?sourceMap'),
          include: paths,
        },
      ],
    },
    plugins: [
      // Output extracted CSS to a file
      new ExtractTextPlugin('[name].[chunkhash].css'),
    ],
  };
};
