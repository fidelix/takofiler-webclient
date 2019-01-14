const path = require('path');
const webpack = require('webpack');

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
    },
    plugins: [
      new webpack.DefinePlugin({
        API_URL: JSON.stringify(process.env.API_URL || 'http://takofiler.anb.l/files/')
      }),
    ]
  };
};
