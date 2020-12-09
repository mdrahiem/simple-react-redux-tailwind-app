const { merge } = require('webpack-merge');
const common = require('./webpack.common');


module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    // to remove all un necessary debugging code by react used in development mode
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    })
  ],
});