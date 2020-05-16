//@ts-check

const { join, resolve } = require('path')
const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const paths = {
    src: resolve(__dirname, 'src'),
    dist: resolve(__dirname, 'dist'),
}
/**
 * 
 * @param {string | Record<string, boolean | number | string>} env 
 * @param {import('webpack').CliConfigOptions} argv 
 * 
 * @returns {import('webpack').Configuration | Promise<import('webpack').Configuration>}
 */
module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production'

    return {
        "entry": join(paths.src, 'app.tsx'),
        "mode": devMode ? 'development' : 'production',
        "devtool": devMode ? 'source-map' : false,
        "module": {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: [
                        'ts-loader',
                        // 'eslint-loader',
                    ],
                },
                {
                    test: /\.module\.scss$/,
                    exclude: /node_modules/,
                    loader: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: {
                                    localIdentName: '[name]__[local]--[hash:base64:5]',
                                },
                            }
                        },
                        'sass-loader',
                    ],
                },
                {
                    test: /(?<!\.module)\.scss$/,
                    exclude: /node_modules/,
                    loader: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.svg/,
                    exclude: /node_modules/,
                    loader: 'file-loader',
                    options: {
                        name: devMode ? '[name].[ext]' : '[name].[hash].[ext]',
                    }
                },
            ],
        },
        "output": {
            path: paths.dist,
            filename: (devMode ? '[name].js' : '[name].[hash].js'),
            chunkFilename: (devMode ? '[id].js' : '[id].[hash].js'),
            publicPath: '/v2/',
        },
        "resolve": {
            extensions: ['.tsx', '.ts', '.js', '.scss', '.css'],
            modules: [
                'node_modules',
                paths.src,
            ],
        },
        "plugins": [
            // new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: join(paths.src, 'index.html'),
                filename: 'index.html',
            }),
            new DefinePlugin({
                __DEVELOPMENT__: devMode,
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: '[name].css',
                chunkFilename: '[id].css',
            }),
        ],
    }
}
