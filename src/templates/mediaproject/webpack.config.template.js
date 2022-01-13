const path = require('path');

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const packageJson = require('./package');

const srcPath = path.resolve(__dirname, 'src');
const buildPath = path.resolve(__dirname, 'public');

const isProd = process.env.NODE_ENV === 'production';

const plugins = [
  new CleanWebpackPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      API_URL: JSON.stringify(process.env.API_URL || '/api/'),
      SENTRY_AUTH_TOKEN: JSON.stringify(process.env.SENTRY_AUTH_TOKEN),
      SENTRY_DSN: JSON.stringify(process.env.SENTRY_DSN),
    },
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(srcPath, 'index.html'),
  }),
  !isProd && new ReactRefreshWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: 'static/css/bundle.[name].[contenthash].css',
  }),
  isProd && new ForkTsCheckerWebpackPlugin(),
  new PreloadWebpackPlugin({
    rel: 'preload',
    fileWhiteList: [/\.(woff2|woff?)$/],
  }),
  new CopyPlugin({
    patterns: [
      {
        from: path.join(srcPath, 'static', 'img'),
        to: path.join(buildPath, 'static', 'img'),
      },
    ],
  }),
  isProd && new SentryWebpackPlugin({
    authToken: process.env.SENTRY_AUTH_TOKEN,
    url: 'https://sentry.pulse.kts.studio/',
    org: 'kts',
    project: '<%= projectName %>',
    release: packageJson.version,
    include: './public',
    ignore: ['node_modules', 'webpack.config.js'],
    cleanArtifacts: true,
  }),
].filter(Boolean);

const getCssLoader = (withModules = false) => [
  isProd ? MiniCssExtractPlugin.loader : 'style-loader',
  {
    loader: 'css-loader',
    options: {
      modules: withModules && {
        localIdentName: isProd ? '[hash:base64]' : '[path][name]__[local]',
      },
      importLoaders: 1,
      sourceMap: false,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          'autoprefixer',
        ],
      },
    },
  },
  {
    loader: 'sass-loader',
    options: {
      sassOptions: {
        includePaths: [srcPath],
      },
    },
  },
];

module.exports = {
  entry: path.resolve(srcPath, 'index.tsx'),
  output: {
    filename: 'static/js/bundle.[contenthash].js',
    path: buildPath,
    publicPath: '/',
  },
  devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
  optimization: {
    minimize: isProd,
    minimizer: isProd
      ? [
          new TerserPlugin({
            terserOptions: {
              sourceMap: true,
            },
          }),
        ]
      : [],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.modules\.(s?css|sass)$/,
        use: getCssLoader(true),
      },
      {
        test: /\.(s?css|sass)$/,
        exclude: /\.modules\.(s?css|sass)$/,
        use: getCssLoader(false),
      },
      {
        test: /\.(component|c).svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              memo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        exclude: /\.(component|c).svg$/,
        type: 'asset',
        generator: {
          filename: 'static/img/[name].[contenthash][ext]',
        },
      },
      {
        test: /\.(eot|woff2|woff|ttf?)$/,
        type: 'asset',
        generator: {
          filename: 'static/fonts/[name].[contenthash][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      components: path.join(srcPath, 'components'),
      config: path.join(srcPath, 'config'),
      img: path.join(srcPath, 'img'),
      pages: path.join(srcPath, 'pages'),
      store: path.join(srcPath, 'store'),
      styles: path.join(srcPath, 'styles'),
      types: path.join(srcPath, 'types'),
      utils: path.join(srcPath, 'utils'),
    },
  },
  plugins,
  devServer: {
    host: 'localhost',
    port: 8080,
    historyApiFallback: true,
    hot: true,
    https: true,
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'https://<%= projectName %>.kube1.ktsdev2.ru',
        secure: true,
      },
    },
  },
};
