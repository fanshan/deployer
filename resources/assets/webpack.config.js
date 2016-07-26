const join = require('path').join;
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const pkg = require('./package.json');
const ManifestPlugin = require('webpack-manifest-plugin');
const tools = require('./libs/parts');

const PATHS = {
  app: join(__dirname, 'js'),
  styles: join(__dirname, 'css'),
  build: join(__dirname, '../../public/build'),
  node: join(__dirname, '/node_modules/'),
};

// FIXME: Clean this up, horrible!
const dependencies = Object.keys(pkg.dependencies).filter((value) => {
  return value !== 'respond.js' && value !== 'html5shiv' && value !== 'font-awesome' && value !== 'ionicons';
});

const common = {
  entry: {
    app_js: PATHS.app,
    app_css: PATHS.styles + '/main.css',
    vendor_css: PATHS.styles + '/vendor.css',
    vendor_js: dependencies,
    ie_js: [
      'html5shiv',
      'respond.js/dest/respond.src.js',
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    fallback: [PATHS.node],
  },
  externals: {
    jquery: 'jQuery',
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
        test: /\.jsx?$/,
        loader: 'babel?cacheDirectory',
        include: PATHS.app,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
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
      tools.extractBundle({
        name: 'vendor',
        entries: ['react'],
      }),
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
