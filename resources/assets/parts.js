const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const pkg = require('./package.json');

exports.dependencies = function () {
  // FIXME: Clean this up, horrible!
  const dependencies = Object.keys(pkg.dependencies).filter((value) => {
    return value !== 'respond.js' && value !== 'html5shiv' && value !== 'font-awesome';
  });

  return dependencies;
};

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

exports.lint = function (path) {
  return {
    module: {
      preLoaders: [
        {
          test: /\.jsx?$/,
          loader: 'eslint',
          include: path,
        },
      ],
    },
  };
};

exports.devServer = function (options) {
  return {
    // entry: [
    //
    //   // For hot style updates
    //   'webpack/hot/dev-server',
    //
    //   // The script refreshing the browser on none hot updates
    //   'webpack-dev-server/client?http://localhost:8080',
    // ],
    output: {
        publicPath: 'http://deployer.app/build/',
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
    devServer: {
      historyApiFallback: false,
      hot: true,
      inline: true,
      stats: 'errors-only',
      host: options.host || '0.0.0.0',
      port: options.port || 8080,
      proxy: {
        '*': {
            target: 'http://deployer.app',
            changeOrigin: true,
            autoRewrite: true,
            xfwd: true,
        },
      },
    },
    plugins: [
      // Enable multi-pass compilation for enhanced performance in larger projects. Good default.
      new webpack.HotModuleReplacementPlugin({
        multiStep: true,
      }),
    ],
  };
};

// exports.setupCSS = function (paths) {
//   return {
//     module: {
//       loaders: [
//         {
//           test: /\.css$/,
//           loaders: ['style', 'css'],
//           include: paths,
//         },
//       ],
//     },
//   };
// };

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

exports.clean = function (build, root) {
  return {
    plugins: [
      new CleanWebpackPlugin([build], {
        root,
      }),
      new WebpackShellPlugin({
        onBuildEnd: [`php ${root}/artisan js-localization:refresh --quiet`],
        onBuildExit: [`rm -f ${build}/css/*.js*`],
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
