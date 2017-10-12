const path = require('path')
const fs = require('fs')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')
const history = require('connect-history-api-fallback')

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

//配合vue-router 启用html5 history模式
app.use(history({
  verbose: dev,
  index: '/'
}))

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, dev? './src/index.html' : './dist/index_prod.html'))
})

app.use('/dist', express.static('dist'))
app.use(express.static('public'))

var port = process.env.PORT || 8888
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
