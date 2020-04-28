
var path = require('path');
var fs = require('fs');
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ROOT = process.cwd();
var config = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: {
        filename: path.join(ROOT, 'src/index.ts')
    },
    output: {
        path: path.join(ROOT, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        strictExportPresence: true,
        rules: [{
            test: /\.(ts|js)$/,
            exclude: /node_modules/,
            include: [
                path.join(ROOT, '/src'),
            ],
            use: [
                {
                    loader: require.resolve('babel-loader'),
                    options: Object.assign({}, JSON.parse(fs.readFileSync(path.resolve(__dirname, '../.babelrc'))))
                }
            ],
        }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(ROOT, 'public/index.html'),
            filename: 'index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    devServer: {
        contentBase: [path.join(ROOT, 'dist')],
        compress: true,
        disableHostCheck: true,
        port: process.env.PORT,
        host: '0.0.0.0',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    }
};
module.exports = config;
