const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = {
    // define the entry point and add babel-polyfill add the beginning to ensure the polyfills are loaded first
    entry: ['babel-polyfill','./src/client/index.js'],
    // this attribute allows us to run minimizing actions on certain files
    optimization: {
        // these are te plugines that we will use to do our optimization work 
        // in this case minifing the extracted css file for all the styles
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
        },
    // allow events in global scope to access js code in function scope from client library 
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    mode: 'production',
    module: {
        // define array of loaders rules
        rules: [
            // loader rule to convert es6 files to vanilla js files
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            // loader rule for handling style sheets in production mode but using mini-css-extract loader which 
            //will load all styles to it's own file rather than loading it as inline styles 
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        // instantiate google workbox webpack blugin to add Service Workers to allow offline access
        new WorkboxPlugin.GenerateSW(),
        // instantiate mini-css-extract-plugin which will extract all the styles in one separate file which will be minified
        new MiniCssExtractPlugin({filename: '[name].css'})
    ]
}