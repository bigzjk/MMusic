const path = require('path')
const webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    entry: './src/pages/inedx.tsx',
    mode: 'production',
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle_[chunkhash:8].js'
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            pages: path.resolve(__dirname, 'src/pages/'),
            images: path.resolve(__dirname, 'src/assets/images/'),
            utils: path.resolve(__dirname, 'src/utils/'),
            components: path.resolve(__dirname, 'src/components/')
        }
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                use: 'babel-loader'
            },
            {
                test: /\.tsx?$/,
                use: ['awesome-typescript-loader', 'ts-loader']
            },
            {  
                test: /\.(js|ts|tsx)$/, 
                enforce: "pre",
                loader: "source-map-loader" 
            },
            {
                test: /\.(scss|css)$/,
                // use: ['style-loader', 'css-loader', 'sass-loader']
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['last 2 version', '>0.1%']
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                // use: ['style-loader', 'css-loader', 'sass-loader']
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['last 2 version', '>0.1%']
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|tiff)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        outputPath: 'images/', // 图片输出路径
                        limit: 10*1024
                    }
                }
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]-[hash:5].min.[ext]',
                        limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                        publicPath: 'fonts/',
                        outputPath: 'fonts/'
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/index.html'),
            filename: 'index.html',
            inject: true,
            // chunks: ['index'],
            minify: {
                html: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css',
            chunkFilename: '[id]_[contenthash:8].css'
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            // minSize: 30000,
            // maxSize: 0,
            // minChunks: 1,
            // maxAsyncRequests: 5,
            // maxInitialRequests: 3,
            // automaticNameDelimiter: '~',
            // name: true,
            // cacheGroups: {
            //     vendors: {
            //         test: /[\\/]node_modules[\\/]/,
            //         priority: -10
            //     },
            //     default: {
            //         minChunks: 2,
            //         priority: -20,
            //         reuseExistingChunk: true
            //     }
            // }
        }
    }

}