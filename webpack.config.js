var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'faker', 'lodash', 'react', 'react-dom', 'react-input-range', 'react-redux',
  'react-router', 'redux', 'redux-form', 'redux-thunk'
];

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js' //'name' will pick name from 'entry' property object
    //'chunkhash' will add hashing to file name. so that file caching can be optimized and 
    //updated whenever change happens to file
  },
  module: {
    rules : [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      //name: 'vendor' //name from 'entry' property object and will load common imports only once and in the file created by 'vendor'
      names: ['vendor','manifest'] //'manifest' here will keep track of chunks updates if any
      //dependency got added or removed in future or code changed in any file, which require file name hash to be changed
      //Note: Property 'name' changed to 'names' and we are using array here as well.
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
    //The HtmlWebpackPlugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags
  ]
};
