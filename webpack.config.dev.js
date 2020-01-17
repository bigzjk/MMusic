const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
    entry: './src/pages/index.tsx',
    mode: 'development',
    devtool: 'cheap-module-source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            pages: path.resolve(__dirname, 'src/pages/'),
            images: path.resolve(__dirname, 'src/assets/images/'),
            utils: path.resolve(__dirname, 'src/utils/'),
            components: path.resolve(__dirname, 'src/components/'),
            hooksRudecer: path.resolve(__dirname, 'src/hooksRudecer/')
        }
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 3003,
        host: 'localhost',
        overlay: true,
        hot: true,
        historyApiFallback: true,
        // proxy:{}
        stats: 'errors-only' // 构建日志
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                use: 'babel-loader',
                include: path.resolve(appDirectory, 'src')
            },
            {
                test: /\.tsx?$/,
                use: [
                    'ts-loader',
                    {
                        options: {
                          emitErrors:true,
                        },
                        loader: require.resolve('tslint-loader'),
                      }
                ],
                enforce: 'pre', // 前置执行
                include: path.resolve(appDirectory, 'src')
            },
            {  
                test: /\.(js|ts|tsx)$/, 
                enforce: "pre",
                loader: "source-map-loader" 
            },
            {
                test: /\.(scss|css)$/,
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
                test: /\.less$/,
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
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
    // config.optimization.splitChunks
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({ // optimization.splitChunks代替
        //     name: 'vendor',
        //     // filename: "vendor.js"
        //     // (Give the chunk a different name)
      
        //     minChunks: Infinity,
        //     // (with more entries, this ensures that no other module
        //     //  goes into the vendor chunk)
        // }),
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'react',
                    entry: 'https://unpkg.com/react@16/umd/react.development.js',
                    global: 'React'
                },
                {
                    module: 'react-dom',
                    entry: 'https://unpkg.com/react-dom@16/umd/react-dom.development.js',
                    global: 'ReactDOM'
                }
            ]
        }),
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
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
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
        }
    },
}