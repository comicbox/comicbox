
// https://webpack.js.org/guides/production/

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname, 'src'),
    JS: path.resolve(__dirname, 'src/js'),
    CSS: path.resolve(__dirname, 'src/css'),
};

module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production'
    return {
        mode: process.env.NODE_ENV,
        devtool: devMode ? 'source-map' : '',
        entry: {
            // polyfill: "babel-polyfill",
            main: path.join(paths.JS, 'index.tsx'),
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            ['@babel/plugin-transform-typescript', { isTSX: true, jsxPragma: "h" }],
                            ['@babel/plugin-proposal-decorators', { "legacy": true }],
                            ['@babel/plugin-transform-react-jsx', { pragma: 'h' }],
                            'transform-class-properties'
                        ]
                    },
                },
                // {
                //     test: /\.jsx?$/,
                //     loader: 'babel-loader',
                //     options: {
                //         plugins: [
                //             ['@babel/plugin-transform-react-jsx', { pragma: 'preact.h' }]
                //         ]
                //     },
                //     exclude: /node_modules/
                // },
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

            alias: {
                'react': 'preact',
                'react-dom': 'preact'
            }
        },
        output: {
            path: paths.DIST,
            publicPath: '/assets/',
            filename: devMode ? '[name].js' : '[name].[hash].js',
            chunkFilename: devMode ? '[id].js' : '[id].[hash].js',
        },
        plugins: [
            new HtmlWebpackPlugin({
                chunks: ['main'],
                template: path.join(paths.SRC, 'index.html'),
                filename: "index.html",
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: devMode ? '[name].css' : '[name].[hash].css',
                chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
            }),
            new webpack.WatchIgnorePlugin([
                /css\.d\.ts$/
            ]),
        ],
    }
};