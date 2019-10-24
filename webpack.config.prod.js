const path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// 速度分析
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
// 代码多进程压缩
const TerserWebpackPlugin = require('terser-webpack-plugin') 


const smp = new SpeedMeasureWebpackPlugin()
module.exports = smp.wrap({
    entry: './src/pages/index.tsx',
    mode: 'production',
    // devtool: 'cheap-module-eval-source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle_[chunkhash:8].js'
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        alias: {
            pages: path.resolve(__dirname, 'src/pages/'),
            images: path.resolve(__dirname, 'src/assets/images/'),
            utils: path.resolve(__dirname, 'src/utils/'),
            components: path.resolve(__dirname, 'src/components/'),
            hooksRudecer: path.resolve(__dirname, 'src/hooksRudecer/')
        }
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                enforce: "pre",
                // use: 'babel-loader'
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: 3
                        },
                    },
                    'babel-loader'
                ],
            },
            {
                test: /\.tsx?$/,
                use: ['ts-loader']
            },
            // {  
            //     test: /\.(js|ts|tsx)$/, 
            //     enforce: "pre",
            //     loader: "source-map-loader" 
            // },
            
            // {
            //     test: /\.(scss|css)$/,
            //     // use: ['style-loader', 'css-loader', 'sass-loader']
            //     use: [
            //         MiniCssExtractPlugin.loader,
            //         'css-loader',
            //         'sass-loader',
            //         {
            //             loader: 'postcss-loader',
            //             options: {
            //                 plugins: () => [
            //                     require('autoprefixer')({
            //                         overrideBrowserslist: ['last 2 version', '>0.1%']
            //                     }),
            //                     require('postcss-pxtorem')({
            //                         rootValue: 100,
            //                         propWhiteList: [],
            //                         // minPixelValue:2,
            //                     })
            //                 ]
            //             }
            //         }
            //     ]
            // },
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
                                }),
                                require('postcss-pxtorem')({
                                    rootValue: 100,
                                    propWhiteList: [],
                                    // minPixelValue:2,
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
        // new webpack.HotModuleReplacementPlugin(),
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
            minSize: 3000,
            maxSize: 0,
            minChunks: 2,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
                commons: {
                    test: /(react|react-dom)/,
                    name: 'vendors_react',
                    chunks: 'all' 
                }
            }
        },
        minimizer: [
            new TerserWebpackPlugin({
                parallel: 4
            })
        ]

    },
    stats: 'errors-only'
})