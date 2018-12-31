
// https://webpack.js.org/guides/production/

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const WebpackOnBuildPlugin = require('on-build-webpack');
const WebpackPwaManifest = require('webpack-pwa-manifest')
const { ncp } = require('ncp');

const fs = require("fs");
const svg2png = require("svg2png");

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
                    test: /\.(png|jpg|gif|woff2)$/,
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
            new HtmlWebpackPlugin({
                chunks: [],
                template: path.join(paths.SRC, 'graphql.html'),
                filename: "graphql.html",
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
                orientation: 'any',
                fingerprints: !devMode,
                icons: [
                    {
                        src: (()=>{
                            const svgPath = path.join(paths.RES, 'icons/icon.svg')
                            const pngPath = path.resolve(paths.RES, 'icons/icon.png')

                            let svg = fs.readFileSync(svgPath)
                            let png = svg2png.sync(svg, { height: 1024 })
                            fs.writeFileSync(pngPath, png)

                            return pngPath
                        })(),
                        sizes: [96, 128, 192, 256, 384, 512]
                    }
                ],
            }),
        ],
    }
};
