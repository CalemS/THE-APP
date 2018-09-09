const { CheckerPlugin } = require('awesome-typescript-loader')
const path = require('path')

module.exports = {
  baseUrl: '/v/',
  outputDir: 'dist/v/',
  lintOnSave: true,
  configureWebpack: {
    mode: process.env.STAGE == "prod" ? "production" : "development",
  }
}
