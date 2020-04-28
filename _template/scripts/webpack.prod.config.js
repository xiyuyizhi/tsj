
var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var TerserPlugin = require('terser-webpack-plugin');
var ROOT = process.cwd();
var config = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        filename: path.join(ROOT, 'src/index.ts')
    },
    output: {
        library: 'Out',
        libraryTarget: 'umd',
        globalObject: 'this',
        filename: 'out.min.js',
        path: path.join(ROOT, 'libs/')
    },
    resolve: {
        extensions: ['.ts']
    },
    optimization: {
        minimizer: [new TerserPlugin({
            terserOptions: {
                parse: {
                    ecma: 8
                },
                compress: {
                    ecma: 5,
                    warnings: false,
                    comparisons: true
                },
                mangle: {
                    safari10: true
                },
                output: {
                    ecma: 5,
                    comments: false,
                    ascii_only: true
                }
            },
            parallel: true,
            cache: true,
            sourceMap: true
        })]
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /.ts$/,
                exclude: /node_modules/,
                include: [path.join(ROOT, 'src')],
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: Object.assign({}, JSON.parse(fs.readFileSync(path.resolve(ROOT, '.babelrc'))))
                    }
                ]
            }
        ]
    }
};
module.exports = config;
