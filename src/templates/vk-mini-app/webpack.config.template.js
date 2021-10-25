const path = require('path');

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const {
  getLocalIdent,
} = require('@dr.pogodin/babel-plugin-react-css-modules/utils');

const srcPath = path.resolve(__dirname, 'src');
const buildPath = path.resolve(__dirname, 'public');

const isProd = process.env.NODE_ENV === 'production';
const isZip = process.env.IS_ZIP === 'true';

const REGEXP = {
  nodeModules: /node_modules/,
  scripts: /\.(ts|js)x?$/,
  styles: /\.s?css$/,
  stylesModules: /\.modules\.(s?css|sass)$/,
  images: /\.(png|jpg|gif|svg)$/,
  svgComponents: /\.(component|c)\.svg$/,
  fonts: /\.(eot|woff2|woff?)$/,
};

const getCSSLoader = (withModules = false) => [
  {
    loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader',
  },
  {
    loader: 'css-loader',
    options: {
      modules: withModules && {
        getLocalIdent,
        localIdentName: '[name]__[local]__[contenthash:base64:5]',
      },
      importLoaders: 1,
      sourceMap: false,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        config: path.resolve(__dirname, 'postcss.config.js'),
        plugins: () => [autoprefixer()],
      },
    },
  },
  {
    loader: 'sass-loader',
    options: {
      sassOptions: {
        includePaths: [srcPath, path.join(srcPath, 'styles')],
      },
    },
  },
];

const preloadPlugin = isZip
  ? []
  : [
      new PreloadWebpackPlugin({
        rel: 'preload',
        include: 'initial',
        fileWhitelist: [REGEXP.fonts],
        as(entry) {
          return REGEXP.fonts.test(entry) ? 'font' : 'script';
        },
      }),
    ];

const buildStaticPath = (path) =>
  `${isZip ? '' : `static/${path}`}`;
    
const buildFilename = (path, filename) =>
  `${isZip ? '' : `static/${path}/`}${filename}`;

const rules = () => [
  {
    test: REGEXP.scripts,
    exclude: REGEXP.nodeModules,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          plugins: [!isProd && require.resolve('react-refresh/babel')].filter(
            Boolean
          ),
        },
      },
    ],
  },
  {
    test: REGEXP.images,
    exclude: REGEXP.svgComponents,
    type: 'asset',
    generator: {
      filename: buildFilename('img', '[name].[hash][ext]'),
    },
  },
  {
    test: REGEXP.svgComponents,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          memo: true,
        },
      },
    ],
  },
  {
    test: REGEXP.fonts,
    type: 'asset',
    generator: {
      filename: buildFilename('fonts', '[name].[hash][ext]'),
    },
  },
  {
    test: REGEXP.styles,
    exclude: REGEXP.stylesModules,
    use: getCSSLoader(false),
  },
  {
    test: REGEXP.stylesModules,
    use: getCSSLoader(true),
  },
];

const plugins = () => [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      API_URL: JSON.stringify(process.env.API_URL),
    },
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.join(srcPath, 'index.html'),
  }),
  new MiniCssExtractPlugin({
    filename: buildFilename('css', 'bundle.[name].[contenthash].css'),
  }),
  new ForkTsCheckerWebpackPlugin({
    typescript: {
      configFile: path.resolve(__dirname, 'tsconfig.json'),
    },
  }),
  new CopyPlugin({
    patterns: [
      {
        from: path.join(srcPath, 'static'),
        to: buildStaticPath('static'),
        noErrorOnMissing: true,
      },
    ],
  }),
  new webpack.ProgressPlugin(),
  !isProd && new ReactRefreshWebpackPlugin(),
  ...preloadPlugin,
];

const devServer = () => ({
  host: '0.0.0.0',
  historyApiFallback: true,
  hot: true,
  https: true,
  proxy: {
    '/api': {
      changeOrigin: true,
      target: 'https://<%= projectName %>.kube1.ktsdev.ru/',
      secure: true,
    },
  },
});

const aliases = [
  'components',
  'config',
  'img',
  'pages',
  'store',
  'styles',
  'utils',
];
const generateAliases = () =>
  aliases.reduce(
    (prev, alias) => ({ ...prev, [alias]: path.join(srcPath, alias) }),
    {}
  );

module.exports = {
  mode: isProd ? 'production' : 'development',
  context: srcPath,
  devtool: isProd ? 'hidden-source-map' : 'source-map',
  entry: './index.tsx',
  output: {
    path: buildPath,
    publicPath: isZip ? './' : '/',
    filename: buildFilename('js', '[name].[fullhash:8].js'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: generateAliases(),
  },
  module: {
    rules: rules(),
  },
  plugins: plugins().filter(Boolean),
  devServer: devServer(),
};
