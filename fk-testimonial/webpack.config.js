/** @format */

const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = (_, args) => ({
    output: {
        ...(args.mode === "production"
            ? {
                publicPath: `${process.env.WEB_APP_HOST}/${process.env.WEB_APP_PATH || 'testimonials'}/`,
                path: path.resolve(__dirname, "build/static"),
            }
            : {
                publicPath: `/`,
                path: path.resolve(__dirname, "build/static"),
            }),
    },
    target: args.mode === "production" ? undefined : "web",
    entry: {
        testimonialPoc: {
            import: "./src/Routes.js",
            filename: `${process.env.WEB_APP_PATH || 'testimonials'}.js`,
        }
    },
    resolve: {
        extensions: [".jsx", ".js", ".json"],
    },
    devServer: {
        disableHostCheck: true,
        port: 5000,
        host: "0.0.0.0",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers":
                "X-Requested-With, content-type, Authorization",
        },
        contentBase: [path.join("public")],
        contentBasePublicPath: "/",
        // historyApiFallback: {
        //     rewrites: [
        //         { from: /^\/$/, to: './src/index.html' },
        //     ]
        // }
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.m?js/,
                type: "javascript/auto",
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    // options: {
                    //   presets: ["@babel/preset-react", "@babel/preset-typescript"],
                    // },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            inject: args.mode === "production" ? false : true,
        }),
    ],
})