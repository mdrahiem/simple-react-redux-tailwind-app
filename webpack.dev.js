const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  devServer: {
    historyApiFallback: true
  },
  devtool: 'inline-source-map',
  mode: 'development'
});