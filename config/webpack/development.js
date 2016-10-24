import path from 'path';
import webpack from 'webpack';
import DashboardPlugin from 'webpack-dashboard/plugin';
import { smart as merge } from 'webpack-merge';
import common from './common';

const context = path.resolve(__dirname, '../..');

export default merge({
  devtool: 'inline-source-maps',
  entry: [
    'react-hot-loader/patch'
  ],
  output: {
    filename: '[name].js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[id].js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new DashboardPlugin()
  ],
  devServer: {
    hot: true,
    quiet: true,
    historyApiFallback: true,
    inline: true,
    outputPath: path.join(context, 'dist'),
    stats: false,
    watchOptions: { poll: 1000, ignored: /node_modules/ }
  }
}, common);