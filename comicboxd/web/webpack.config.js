
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
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.scss$/,
                    use:[
                        MiniCssExtractPlugin.loader,
                        'typings-for-css-modules-loader?modules&namedExport&sass'
                    ] 
                    // use: [
                    //     MiniCssExtractPlugin.loader,
                    //     // "css-loader",   // translates CSS into CommonJS
                    //     // 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
                    //     'typings-for-css-modules-loader?modules&namedExport',
                    //     // "sass-loader",  // compiles Sass to CSS
                    // ]
                },
                // {
                //     test: /\.css$/,
                //     loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
                // },

            ],

        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            modules: [
                "node_modules",
                paths.SRC
            ]
        },
        // output: {
        //     path: paths.DIST,
        //     filename: devMode ? '[name].js' : '[name].[hash].js',
        //     chunkFilename: devMode ? '[id].js' : '[id].[hash].js',
        // },
        plugins: [
            new HtmlWebpackPlugin({
                chunks: ['main'],
                template: path.join(paths.SRC, 'index.html'),
                filename: "index.html",
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                // filename: devMode ? '[name].css' : '[name].[hash].css',
                // chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
            }),
            new webpack.WatchIgnorePlugin([
                /css\.d\.ts$/
            ]),
        ],
    }
};