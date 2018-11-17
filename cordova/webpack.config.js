
// https://webpack.js.org/guides/production/

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const WebpackOnBuildPlugin = require('on-build-webpack');
const { ncp } = require('ncp');

ncp.limit = 16;

const paths = {
    DIST: path.resolve(__dirname, 'www'),
    BROWSER: path.resolve(__dirname, 'platforms/browser/www'),
    SRC: path.resolve(__dirname, 'src'),
    JS: path.resolve(__dirname, 'src/js'),
    CSS: path.resolve(__dirname, 'src/css'),
};

module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production'
    return {
        mode: process.env.NODE_ENV,
        // devtool: devMode ? 'source-map' : '',
        entry: {
            // polyfill: "@babel/polyfill",
            main: path.join(paths.JS, 'index.tsx'),
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: [
                        // 'babel-loader',
                        'ts-loader',
                        'tslint-loader',
                    ],
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'typings-for-css-modules-loader?modules&namedExport&camelCase&sass&localIdentName=[name]__[local]___[hash:base64:5]',
                        "sass-loader",
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                    ]
                },

            ],

        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            modules: [
                "node_modules",
                paths.SRC
            ],
        },
        output: {
            path: paths.DIST,
            publicPath: '',
            // publicPath: '',
            filename: './' + (devMode ? '[name].js' : '[name].[hash].js'),
            chunkFilename: './' + (devMode ? '[id].js' : '[id].[hash].js'),
        },
        plugins: [
            new HtmlWebpackPlugin({
                chunks: [
                    // "polyfill",
                    'main',
                ],
                template: path.join(paths.SRC, 'index.html'),
                filename: "index.html",
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: './' + (devMode ? '[name].css' : '[name].[hash].css'),
                chunkFilename: './' + (devMode ? '[id].css' : '[id].[hash].css'),
            }),
            new webpack.WatchIgnorePlugin([
                /css\.d\.ts$/
            ]),
            new WebpackOnBuildPlugin(function (stats) {
                ncp(paths.DIST, paths.BROWSER, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                });
            }),
        ],
    }
};