module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@apis': './src/apis',
          '@configs': './src/configs',
          '@database': './src/database',
          '@errors': './src/errors/*',
          '@middlewares': './src/middlewares',
          '@modules': './src/modules',
          '@routes': './src/routes',
          '@tests': './src/tests',
          '@types': 'src/@types',
          '@utils': './src/utils',
        },
      },
    ],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
