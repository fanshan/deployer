const join = require('path').join;
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const pkg = require('./package.json');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');
const tools = require('./libs/parts');

const PATHS = {
  app: join(__dirname, 'js'),
  styles: join(__dirname, 'css'),
  build: join(__dirname, '../../public/build'),
  node: join(__dirname, '/node_modules/'),
};

// FIXME: Clean this up, horrible!
const dependencies = Object.keys(pkg.dependencies).filter((value) => {
  return value !== 'respond.js' && value !== 'html5shiv' && value !== 'font-awesome';
});

//dependencies.push('js/localization.js');


const common = {
  entry: {
    'js/app': PATHS.app,
    'js/vendor': dependencies,
    'js/ie': [
      'html5shiv',
      'respond.js/dest/respond.src.js',
    ],
    'css/app': PATHS.styles + '/main.css',
    'css/vendor': PATHS.styles + '/vendor.css',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
    fallback: [PATHS.node],
  },
  externals: {
    'lang': 'Lang',
  },
  output: {
    path: PATHS.build,
    filename: '[name].[chunkhash].js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[chunkhash].js',
  },
  module: {
    // preLoaders: [
    //   {
    //     test: /\.jsx?$/,
    //     loaders: ['eslint'],
    //     include: PATHS.app,
    //   },
    // ],
    loaders: [
      {
        test: /\.(jpg|png)$/,
        //loader: 'url?limit=25000',
        loader: 'file',
        query: {
          name: 'images/[name].[hash].[ext]',
        },
        include: PATHS.node,
      },
      {
        test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file',
        query: {
          name: 'images/[name].[hash].svg',
        },
        include: PATHS.node,
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        //loader: 'url',
        loader: 'file',
        query: {
          name: 'fonts/[name].[hash].[ext]',
          limit: 5000,
          mimetype: 'application/font-woff'
        },
        include: PATHS.node,
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file',
        query: {
          name: 'fonts/[name].[hash].[ext]'
        },
        include: PATHS.node,
      },
      {
        test: /\.jsx?$/,
        loader: 'babel?cacheDirectory',
        include: PATHS.app,
        exclude: PATHS.node,
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery'
    }),
    new ManifestPlugin({
      fileName: 'rev-manifest.json',
    }),
  ],
};

let config;

// Detect how npm is run and branch based on that
switch (process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(common,
      {
        devtool: 'source-map',
      },
      tools.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
      ),
      tools.clean(PATHS.build),
      // tools.extractBundle({
      //   name: 'vendor',
      //   entries: ['react'],
      // }),
      tools.minify(),
      tools.extractCSS(PATHS.style)
    );
    break;
  default:
    config = merge(common,
      {
        devtool: 'eval-source-map',
      },
      tools.setupCSS(PATHS.style),
      tools.devServer({
        host: process.env.HOST,
        port: process.env.PORT,
      })
    );
}

module.exports = validate(config);
