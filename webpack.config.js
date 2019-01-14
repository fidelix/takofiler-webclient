const path = require('path');

module.exports = environment => {
  let env = process.env.NODE_ENV
  if (env !== 'production') env = 'development';
  return {
    mode: env,
    entry: './src/index.js',
    output: {
      filename: 'app.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        }
      ]
    }
  };
};
