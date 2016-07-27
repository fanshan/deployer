const join = require('path').join;
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const pkg = require('./package.json');
const ManifestPlugin = require('manifest-revision-webpack-plugin');
const Formatter = require('manifest-revision-webpack-plugin/format');
const WebpackShellPlugin = require('webpack-shell-plugin');
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

// FIXME: Clean this up, horrible!
const dependencies = Object.keys(pkg.dependencies).filter((value) => {
  return value !== 'respond.js' && value !== 'html5shiv' && value !== 'font-awesome';
});

const elixirFormatter = function (data, parsedAssets) {
  const format = new Formatter(data, parsedAssets);
  const outputData = format.general();

  return JSON.stringify(outputData.assets, null, 2);
};

const common = {
  entry: {
    'js/app': PATHS.app,
    'js/vendor': dependencies,
    'js/ie': [
      'html5shiv',
      'respond.js/dest/respond.src.js',
    ],
    'css/app': `${PATHS.styles}/main.css`,
    'css/vendor': `${PATHS.styles}/vendor.css`,
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
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
    // preLoaders: [
    //   {
    //     test: /\.jsx?$/,
    //     loader: 'eslint',
    //     include: PATHS.app,
    //   },
    // ],
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
        loader: 'babel?cacheDirectory',
        include: PATHS.app,
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.ProvidePlugin({ // FIXME: Still missing jqueryui
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
    new ManifestPlugin(join(PATHS.build, 'rev-manifest.json'), {
      rootAssetPath: PATHS.build,
      extensionsRegex: /\.(css|js)$/i,
      format: elixirFormatter,
    }),
    new WebpackShellPlugin({
      onBuildEnd: [`php ${PATHS.root}/artisan js-localization:refresh --quiet`],
      onBuildExit: [`rm -f ${PATHS.build}/css/*.js*`],
    }),
  ],
};

let config;

// Detect how npm is run and branch based on that
switch (process.env.npm_lifecycle_event) {
  case 'build':
  case 'stats':
    config = merge(common,
      tools.debug(true, production),
      tools.setFreeVariable('process.env.NODE_ENV', 'production'), // FIXME: Shouldn't this be changed?
      tools.clean(PATHS.build),
      production ? tools.minify() : {},
      tools.extractCSS(PATHS.style)
    );
    break;
  default:
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
