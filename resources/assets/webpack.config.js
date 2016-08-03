const join = require('path').join;
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const ManifestPlugin = require('manifest-revision-webpack-plugin');
const webpack = require('webpack');
const tools = require('./parts');

const PATHS = {
  app: join(__dirname, 'js'),
  styles: join(__dirname, 'css'),
  build: join(__dirname, '../../public/build'),
  node: join(__dirname, '/node_modules/'),
  root: join(__dirname, '../../'),
};

const production = (process.env.NODE_ENV === 'production');

const common = {
  entry: {
    'js/app': [PATHS.app],
    'js/vendor': tools.dependencies(),
    'js/ie': [
      'html5shiv',
      'respond.js/dest/respond.src.js',
    ],
    'css/app': `${PATHS.styles}/main.css`,
    'css/vendor': `${PATHS.styles}/vendor.css`,
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
    alias: {
      'jquery-ui': 'jquery-ui/ui/widget.js',
    },
    fallback: [PATHS.node],
  },
  externals: {
    lang: 'Lang',
  },
  output: {
    path: PATHS.build,
    publicPath: '/build/',
    filename: '[name].[hash].js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[chunkhash].js',
  },
  module: {
    loaders: [
      {
        test: /\.(jpe?g|png|gif|svg)(\?\S*)?$/,
        loader: 'file',
        query: {
          name: 'images/[name].[hash].[ext]',
        },
        include: PATHS.node,
      },
      {
        test: /\.(woff2?|ttf|eot)(\?\S*)?$/,
        loader: 'file',
        query: {
          name: 'fonts/[name].[hash].[ext]',
        },
        include: PATHS.node,
      },
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel?cacheDirectory'],
        include: PATHS.app,
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
    new ManifestPlugin(join(PATHS.build, 'rev-manifest.json'), {
      rootAssetPath: '/build/',
      extensionsRegex: /\.(css|js)$/i,
      format: tools.elixirFormatter,
    }),
  ],
};

let config;

// Detect how npm is run and branch based on that
switch (process.env.npm_lifecycle_event) {
  case 'build':
  case 'stats':
    config = merge(common,
      process.env.npm_lifecycle_event === 'build' ? tools.lint(PATHS.app) : {},
      process.env.npm_lifecycle_event === 'build' ? tools.clean(PATHS.build, PATHS.root) : {},
      production ? tools.minify() : {},
      tools.debug(true, production),
      tools.setFreeVariable('process.env.NODE_ENV', JSON.stringify(process.env.NODE_ENV)),
      tools.extractCSS(PATHS.style)
    );
    break;
  default:
    common.entry['js/app'].unshift('webpack/hot/only-dev-server');
    common.entry['js/app'].unshift('webpack-dev-server/client?http://deployer.app:8080/');

    config = merge(common,
      tools.debug(false),
      tools.extractCSS(PATHS.style),
      tools.devServer({
        host: process.env.HOST,
        port: process.env.PORT,
      })
    );
}

module.exports = validate(config, {
  returnValidation: false,
  quiet: true,
});
