const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin');
const options = { hostname: 'http://puppyx.local' }
module.exports = {
    entry: ['./src/main.js'],
    output: {
        filename: 'bundle.js'
    },
    mode: process.env.NODE_ENV,
    resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        'postcss-loader',
                    ],
                }),
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }

        ],
    },
    plugins: [
        new ExtractTextPlugin('styles.css', {
            disable: process.env.NODE_ENV === 'development',
        }),
        new LiveReloadPlugin(options)
    ],
}