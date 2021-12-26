const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    // define the entry point and add babel-polyfill add the beginning to ensure the polyfills are loaded first
    entry: ['babel-polyfill','./src/client/index.js'],
    // access js code from library client 
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    // specify the mode on the config file
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    module: {
        // define array of loaders rules
        rules: [
            // loader rule to convert es6 files to vanilla js files
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            // loader rule to convert scss files to css file then automatically injects styles into the DOM using style-loader
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            }
        ]
    },
    // array of plugin rules that used to perform a wider range of tasks
    plugins: [
        // instantiate html-webpack-plugin to automatically add main.js file references to the html file in dist folder
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ]
}
