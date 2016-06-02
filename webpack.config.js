const { join } = require('path')
const getConfig = require('hjs-webpack')

const config = getConfig({
  in: join(__dirname, 'src'),
  out: join(__dirname, 'dist'),
  clearBeforeBuild: true,
  isDev: true
})

module.exports = config
