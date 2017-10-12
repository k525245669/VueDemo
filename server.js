const path = require('path')
const fs = require('fs')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)

const dev = process.env.ENV !== "production"
if(dev) {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: '/dist/',
    stats: {
      colors: true,
      chunks: false
    }
  }))
  app.use(webpackHotMiddleware(compiler))
} else {
  try{
    var buildFiles = fs.readdirSync('dist')
  }catch (e) {
    console.log("please run 'npm build' first ")
    return
  }
}

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, dev? 'index.html' : 'index_prod.html'))
})

app.use('/dist', express.static('dist'))

const port = process.env.PORT || 8888
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})