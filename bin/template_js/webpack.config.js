const path = require('path');

const webpack = require('webpack');
const BitwigWebpackPlugin = require('bitwig-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const tsconfig = require('./tsconfig.json');

module.exports = {
    entry: { '{{ scriptname }}.control': './src/{{ scriptname }}.control.js' },
    output: { path: path.resolve(__dirname, 'dist'), filename: '[name].js' },
    resolve: {
        extensions: ['.ts', '.js'],
        // allow non relative imports from project root
        modules: [tsconfig.compilerOptions.baseUrl, 'node_modules'],
    },
    // setup typescript loader for ts and js files
    module: {
        rules: [
            {
                test: /\.[tj]s$/,
                loader: 'ts-loader',
                options: {
                    compilerOptions: { checkJs: false }, // don't have build process type check js files
                    entryFileIsJs: true, // this setting is required if your entry file is a js file
                },
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new BitwigWebpackPlugin(), // enables synchronous code splitting
        new CopyWebpackPlugin([{ from: 'README.md' }]), // non JS things to copy
        new webpack.NamedModulesPlugin(), // makes it easier to debug webpack output
        // bundle everything coming from the node_modules folder separately
        new webpack.optimize.CommonsChunkPlugin({
            name: 'libs.bundle',
            minChunks: function(module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            },
        }),
    ],
    stats: {
        colors: true,
        chunks: false,
        version: false,
        hash: false,
        timings: false,
        modules: false,
    },
};
