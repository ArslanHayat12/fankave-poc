/** @format */

const path = require('path')

module.exports = (_, args) => ({
    output: {
        ...(args.mode === 'production'
            ? {
                publicPath: `${process.env.WEB_APP_HOST}/testimonial-poc/`,
                path: path.resolve(__dirname, 'build/static')
            }
            : {
                publicPath: `/`,
                path: path.resolve(__dirname, 'build/static')
            })
    },
    entry: {
        testimonialPoc: {
            import: './src/Routes.js',
            filename: 'testimonial-poc.js'
        }
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json']
    },
    devServer: {
        disableHostCheck: true,
        port: 5000,
        host: '0.0.0.0',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        },
        contentBase: [path.join('public')],
        contentBasePublicPath: '/testimonial-poc',
        // historyApiFallback: {
        //     rewrites: [
        //         { from: /^\/$/, to: './src/index.html' },
        //     ]
        // }
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.m?js/,
                type: 'javascript/auto',
                resolve: {
                    fullySpecified: false
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                    // options: {
                    //   presets: ["@babel/preset-react", "@babel/preset-typescript"],
                    // },
                }
            }
        ]
    },

})
