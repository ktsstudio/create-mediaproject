const path = require('path');

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWepbackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { getLocalIdent } = require('@dr.pogodin/babel-plugin-react-css-modules/utils');

const srcPath = path.resolve(__dirname, 'src');
const buildPath = path.resolve(__dirname, 'public');

const isProd = process.env.NODE_ENV === 'production';
const isZip = process.env.IS_ZIP === 'true';

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
        getLocalIdent,
        localIdentName: '[path]___[name]__[local]___[hash:base64:6]',
      },
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
        include: 'allAssets',
        fileWhitelist: [/\.(eot|woff2|woff?)$/],
        as(entry) {
          if (/\.(eot|woff2|woff?)$/.test(entry)) {
            return 'font';
          }
          return 'script';
        },
      }),
    ];

module.exports = {
  context: srcPath,
  devtool: isProd ? 'hidden-source-map' : 'source-map',
  entry: './index.tsx',
  output: {
    path: buildPath,
    publicPath: isZip ? './' : '/',
    filename: '[name].[hash].js',
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename: '[id].[hash].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      styles: path.join(srcPath, 'styles'),
      config: path.join(srcPath, 'config'),
      store: path.join(srcPath, 'store'),
      pages: path.join(srcPath, 'pages'),
      img: path.join(srcPath, 'img'),
      components: path.join(srcPath, 'components'),
      utils: path.join(srcPath, 'utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset',
        generator: {
          filename: '[name].[hash][ext]',
        },
      },
      {
        test: /\.(eot|woff2|woff|ttf?)$/,
        type: 'asset',
        generator: {
          filename: '[name].[hash][ext]',
        },
      },
      {
        test: /\.(component|c)\.svg$/,
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
        test: /\.svg$/,
        exclude: /\.component\.svg$/,
        loader: 'url-loader',
      },
      {
        test: /\.s?css$/,
        exclude: /\.modules\.(s?css|sass)$/,
        use: getCSSLoader(false),
      },
      {
        test: /\.modules\.(s?css|sass)$/,
        use: getCSSLoader(true),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new HtmlWepbackPlugin({
      filename: 'index.html',
      template: path.join(srcPath, 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.[name].[contenthash].css',
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(__dirname, 'tsconfig.json'),
      },
    }),
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(process.env.API_URL),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(srcPath, 'img'),
          to: path.join(buildPath),
        },
      ],
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    ...preloadPlugin,
  ].filter(Boolean),
  devServer: {
    host: '0.0.0.0',
    historyApiFallback: true,
    inline: true,
    hot: true,
    https: true,
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'https://<%= projectName %>.kube1.ktsdev.ru/',
        secure: true,
      },
    },
  },
};
