const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve('dist')
    },
    module: {
        rules: [{
            test: /\.ts?$/,
            exclude: /node_modules/,
            loader: 'ts-loader',
            options: {
                configFile: './config/tsconfig.json'
            }
        }, {
            test: /\.html$/i,
            loader: 'html-loader'
        }]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: ['node_modules']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new CleanWebpackPlugin()
    ]
}