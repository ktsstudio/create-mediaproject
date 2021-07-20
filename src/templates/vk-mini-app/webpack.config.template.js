const path = require('path');

const webpack = require('webpack');
const HtmlWepbackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const SentryCliPlugin = require('@sentry/webpack-plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const packageJson = require('./package');

const srcPath = path.resolve(__dirname, 'src');
const buildPath = path.resolve(__dirname, 'public');

const isProd = process.env.NODE_ENV === 'production';

const sentryPlugin = isProd
  ? [
      // new SentryCliPlugin({
      //   release: packageJson.version,
      //   include: './public',
      //   sourceMapReference: true,
      //   ignore: ['node_modules', 'webpack.config.js'],
      // }),
    ]
  : [];

const getCSSLoader = (withModules = false) => [
  isProd
    ? {
        loader: MiniCssExtractPlugin.loader,
      }
    : {
        loader: 'style-loader',
      },
  {
    loader: 'css-loader',
    options: {
      modules: withModules && {
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
  entry: path.join(srcPath, 'index.tsx'),
  output: {
    filename: 'static/js/bundle.[contenthash].js',
    path: buildPath,
  },
  devtool: isProd ? 'source-map' : 'eval-source-map',
  optimization: {
    minimize: isProd,
    minimizer: isProd
      ? [
          new TerserPlugin({
            parallel: true,
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
        test: /\.(ts|js)x?$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.s?css$/,
        // exclude: '/node_modules/',
        exclude: /\.modules\.(s?css|sass)$/,
        use: getCSSLoader(false),
      },
      {
        test: /\.modules\.(s?css|sass)$/,
        use: getCSSLoader(true),
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              memo: true,
              svgoConfig: {
                plugins: {
                  removeViewBox: false,
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
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
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_URL: JSON.stringify(process.env.API_URL || '/api/'),
      },
    }),
    new HtmlWepbackPlugin({ template: path.resolve(srcPath, 'index.html') }),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/bundle.[name].[contenthash].css',
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      fileWhitelist: [/\.(woff2|woff?)$/],
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    ...sentryPlugin,
  ].filter(Boolean),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      styles: path.join(srcPath, 'styles'),
      config: path.join(srcPath, 'config'),
      store: path.join(srcPath, 'store'),
      pages: path.join(srcPath, 'pages'),
      components: path.join(srcPath, 'components'),
      utils: path.join(srcPath, 'utils'),
      img: path.join(srcPath, 'img'),
    },
  },
  devServer: {
    host: '127.0.0.1',
    port: 8000,
    historyApiFallback: true,
    inline: true,
    hot: true,
    https: false,
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'https://<%= projectName %>.myteam.ru',
        secure: true,
      },
    },
  },
};
