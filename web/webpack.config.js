
// https://webpack.js.org/guides/production/

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const WebpackOnBuildPlugin = require('on-build-webpack');
const WebpackPwaManifest = require('webpack-pwa-manifest')
const { ncp } = require('ncp');
const child = require('child_process');

ncp.limit = 16;

const paths = {
    ROOT: path.resolve(__dirname, '../'),
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname, 'src'),
    JS: path.resolve(__dirname, 'src/js'),
    CSS: path.resolve(__dirname, 'src/css'),
    RES: path.resolve(__dirname, 'res'),
    COMICBOXD: path.resolve(__dirname, '../comicboxd'),
};


const scssLoaders = (loaders) => [
    MiniCssExtractPlugin.loader,
].concat(loaders).concat([
    {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: [
                require("css-mqpacker")({ sort: true }),
            ]
        },
    },
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
])

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
                    use: scssLoaders([
                        {
                            loader: 'typings-for-css-modules-loader',
                            options: {
                                modules: true,
                                namedExport: true,
                                camelCase: true,
                                localIdentName: '[name]__[local]___[hash:base64:5]',
                            }
                        },
                    ]),
                },
                {
                    test: /app\.scss$/,
                    use: scssLoaders([
                        'css-loader',
                    ]),
                },
                {
                    test: /\.css$/,
                    use: scssLoaders([
                        'css-loader',
                    ]),
                },
                {
                    test: /\.(png|jpg|gif|woff2|josn)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {}
                        }
                    ]
                }

            ],

        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.scss', '.css'],
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
            new WebpackPwaManifest({
                name: 'ComicBox',
                theme_color: '#2196f3',
                background_color: '#f5f5f5',
                start_url: '/',
                display: 'fullscreen',
                fingerprints: !devMode,
                icons: [
                    {
                        src: path.resolve(paths.RES, 'icons/icon.png'),
                        sizes: [96, 128, 192, 256, 384, 512]
                    }
                ],
            }),
            new WebpackOnBuildPlugin(stats => {
                const args = []

                if (devMode) {
                    args.push('-debug')
                }

                args.push(...[
                    '-o', path.join(paths.COMICBOXD, 'data/bindata.go'),
                    '-pkg', 'data',
                    'comicboxd/migrations/...', 'web/dist/...'
                ])

                const result = child.spawnSync('go-bindata', args, { cwd: paths.ROOT })
                if (result.stderr.length !== 0) {
                    throw new Error(result.stderr.toString('utf8'))
                }
            }),
        ],
    }
};