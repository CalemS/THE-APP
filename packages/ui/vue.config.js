
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const tsImportPluginFactory = require('ts-import-plugin')

function isProd() {
    return process.env.STAGE === "prod"
}

module.exports = {
    baseUrl: '/v/',
    outputDir: 'dist/v/',
    lintOnSave: true,
    parallel: !isProd(),
    configureWebpack: {
        mode: isProd() ? "production" : "development",
        optimization: {
            splitChunks: {
                chunks: 'all',
                maxSize: 3000000,
            }
        },
        output: {
            filename: "[name].bundle.[hash].js",
            chunkFilename: "[name].chunk.[hash].js"
        },
        module: {
            rules: [
            ]
        },
        plugins: [
            new CopyWebpackPlugin([ { from: "static/", to: "../" } ]),
        ],
    },
}
