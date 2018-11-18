
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

class SassResolver {

    apply(resolver) {
        resolver.plugin('resolve', (request, callback) => {
            console.log('request', request.request);

            callback()
            return

            // if (this.include && !request.path.startsWith(this.include)) {
            //     callback()
            //     return
            // }
            // const rfs = resolver.fileSystem;
            // const filename = `${path.basename(request.path)}.js`
            // const filePath = resolver.join(request.path, filename)
            // rfs.stat(filePath, (err, stats) => {
            //     if (err || !stats.isFile()) {
            //         callback()
            //         return
            //     }
            //     const indexPath = resolver.join(request.path, 'index.js');
            //     rfs.stat(indexPath, (indexErr, indexStats) => {
            //         if (!indexErr && indexStats.isFile()) {
            //             callback()
            //             return
            //         }
            //         const relativePath = request.relativePath && resolver.join(request.relativePath, filename)
            //         const nextRequest = Object.assign({}, request, { path: filePath, relativePath })
            //         resolver.doResolve(target, nextRequest, `using path: ${filePath}`, callback)
            //     })
            // })
        })

    }
}

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
                    test: /(?<!app)\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'typings-for-css-modules-loader',
                            options: {
                                modules: true,
                                namedExport: true,
                                camelCase: true,
                                localIdentName: '[name]__[local]___[hash:base64:5]',
                            }
                        },
                        "sass-loader",
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: path.join(paths.CSS, '_variables.scss'),
                            },
                        },
                    ]
                },
                {
                    test: /app\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                                includePaths: [
                                    'node_modules', 'src', '.'
                                ]
                            }
                        },
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: path.join(paths.CSS, '_variables.scss'),
                            },
                        },
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
            extensions: ['.tsx', '.ts', '.js', '.scss', '.css'],
            modules: [
                "node_modules",
                paths.SRC
            ],
            plugins: [
                // new SassResolver(),
            ]
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