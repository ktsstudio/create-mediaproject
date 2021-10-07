const { generateScopedNameFactory } = require('@dr.pogodin/babel-plugin-react-css-modules/utils');

module.exports = (api) => {
  api.cache(() => process.env.NODE_ENV);

  const isProd = process.env.NODE_ENV === 'production';

  return {
    presets: [
      [
        require('@babel/preset-env'),
        {
          useBuiltIns: 'entry',
          corejs: 3,
        },
      ],
      require('@babel/preset-react'),
      require('@babel/preset-typescript'),
    ],
    plugins: [
      [require('@babel/plugin-proposal-decorators'), { legacy: true }],
      require('@babel/plugin-proposal-export-default-from'),
      require('@babel/plugin-proposal-class-properties'),
      require('@babel/plugin-transform-async-to-generator'),
      ["@dr.pogodin/react-css-modules", {
        filetypes: {
          '.scss': {
            syntax: 'postcss-scss',
            plugins: ['postcss-nested'],
          },
        },
        generateScopedName:
          generateScopedNameFactory("[path]___[name]__[local]___[hash:base64:6]"),
        webpackHotModuleReloading: true,
        autoResolveMultipleImports: true,
        handleMissingStyleName: 'warn',
      }],
      !isProd && require.resolve('react-refresh/babel'),
    ].filter(Boolean),
  };
};
