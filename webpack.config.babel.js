import path from "path";
import webpack from "webpack";
// import HtmlWebpackPlugin from "html-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";

const SimpleProgressWebpackPlugin = require("customized-progress-webpack-plugin");

export default {
    node: {
        __filename: false,
        __dirname: false
    },
    entry: {
        fileinput: ["./src/index.js"]
    },
    output: {
        path: path.resolve(__dirname, "./assets"),
        publicPath: "./",
        filename: "[name].min.js",
        chunkFilename: "[name].chunk.js"
        // library: "[name]",
        // libraryTarget: "umd"
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    // externals: {
    //     jquery: "jQuery"
    // },
    target: "web",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: "json-loader",
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                exclude: [/node_modules/],
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!less-loader"
                })
            },
            {
                test: /.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            name: "images/webpack/[hash].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new SimpleProgressWebpackPlugin(),
        new ExtractTextPlugin({
            filename: "style.min.css",
            disable: false,
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: true
                ? {
                      warnings: false // eslint-disable-line
                  } // eslint-disable-line
                : false,
            sourceMap: false
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require("cssnano"), // eslint-disable-line global-require
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        })
        // new HtmlWebpackPlugin({
        //     filename: "index.html",
        //     template: "./src/index.html",
        //     inject: true
        // })
    ]
};
