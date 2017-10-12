const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = {
  entry: {
    main: './src/index'
  },
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'index.js'
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader'
            }),
            pass: ExtractTextPlugin.extract({
              use: 'sass-loader',
              fallback: 'vue-style-loader'
            }),
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader',
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*/,
        loader: 'url-loader?limit=1024'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('index.css')
  ]
}



module.exports = config;