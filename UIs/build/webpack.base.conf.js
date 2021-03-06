const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = function () {
    //console.log(process.argv[3])
    return {
        context: path.resolve(__dirname, '../'),
        entry: {
            app: process.env.NODE_ENV === 'production'
                ? './' + process.argv[2] + '/main.js'
                : './admin_ui_src/main.js'
        },
        output: {
            path: process.env.NODE_ENV === 'production'
                ? config.build.assetsRoot
                : config.dev.assetsRoot,
            filename: '[name].js',
            publicPath: process.env.NODE_ENV === 'production'
                ? config.build.assetsPublicPath
                : config.dev.assetsPublicPath
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': process.env.NODE_ENV === 'production'
                    ? resolve(process.argv[2])
                    : resolve('admin_ui_src')
            }
        },
        module: {
            rules: [
                ...(config.dev.useEslint ? [{
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    enforce: 'pre',
                    include: [
                        process.env.NODE_ENV === 'production'
                            ? resolve(process.argv[2])
                            : resolve('admin_ui_src'),
                        resolve('test')
                    ],
                    options: {
                        formatter: require('eslint-friendly-formatter'),
                        emitWarning: !config.dev.showEslintErrorsInOverlay
                    }
                }] : []),
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: vueLoaderConfig
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: utils.assetsPath('img/[name].[hash:7].[ext]')
                    }
                },
                {
                    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: utils.assetsPath('media/[name].[hash:7].[ext]')
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                    }
                }
            ]
        }
    }
}();
