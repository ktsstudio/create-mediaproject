const {
  generateScopedNameFactory,
} = require('@dr.pogodin/babel-plugin-react-css-modules/utils');

module.exports = (api) => {
  api.cache(() => process.env.NODE_ENV);

  const IS_DEV = process.env.NODE_ENV === 'development';

  return {
    presets: [
      [
        require('@babel/preset-env'),
        {
          useBuiltIns: 'entry',
          corejs: 3,
          targets: { browsers: 'last 2 versions' },
        },
      ],
      require('@babel/preset-typescript'),
      require('@babel/preset-react'),
    ],
    plugins: [
      [require('babel-plugin-styled-components'), { displayName: IS_DEV }],
      [require('@babel/plugin-proposal-decorators'), { legacy: true }],
      require('@babel/plugin-proposal-export-default-from'),
      require('@babel/plugin-proposal-class-properties'),
      require('@babel/plugin-transform-async-to-generator'),
      [
        '@dr.pogodin/react-css-modules',
        {
          filetypes: {
            '.scss': {
              syntax: 'postcss-scss',
              plugins: ['postcss-nested'],
            },
          },
          generateScopedName: generateScopedNameFactory(
            '[name]__[local]__[contenthash:base64:5]'
          ),
          webpackHotModuleReloading: true,
          autoResolveMultipleImports: true,
          handleMissingStyleName: 'warn',
        },
      ],
    ].filter(Boolean),
  };
};
