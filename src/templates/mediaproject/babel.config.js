module.exports = (api) => {
  const isProd = process.env.NODE_ENV === 'production';

  api.cache(() => process.env.NODE_ENV);

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
      !isProd && 'react-refresh/babel',
      require('@babel/plugin-proposal-export-default-from'),
      [
        '@dr.pogodin/react-css-modules',
        {
          filetypes: {
            '.scss': {
              syntax: 'postcss-scss',
              plugins: ['postcss-nested'],
            },
          },
          generateScopedName: isProd
            ? '[hash:base64]'
            : '[path][name]__[local]',
          webpackHotModuleReloading: true,
          autoResolveMultipleImports: true,
          handleMissingStyleName: 'warn',
        },
      ],
    ].filter(Boolean),
  };
};
