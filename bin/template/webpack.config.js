const path = require('path');

const glob = require('glob');
const webpack = require('webpack');
const BitwigWebpackPlugin = require('bitwig-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const tsconfig = require('./tsconfig.json');

// generate per source file cache groups for easier debugging in dev mode
const rootDirRegex = new RegExp(`^${path.join(tsconfig.compilerOptions.rootDir)}`);
const perFileCacheGroups = Array.from(
    new Set([].concat(...tsconfig.include.map(p => glob.sync(p))))
).reduce((result, p) => {
    // strip file type, replace root source dir with desired project file out dir
    const cacheGroupName = p.slice(0, -3).replace(rootDirRegex, 'project-files');
    result[cacheGroupName] = {
        name: cacheGroupName,
        test: RegExp(path.join(__dirname, p)),
        chunks: 'initial',
        enforce: true,
    };
    return result;
}, {});

// declare webpack config based on mode
module.exports = (_, { mode }) => ({
    mode,
    entry: {
        '{{ scriptName }}.control': './src/index.{% if typescript %}ts{% else %}js{% endif %}',
    },
    output: { path: path.resolve(__dirname, 'dist'), filename: '[name].js' },
    resolve: {
        // allow both TypeScript and JavaScript files
        extensions: ['.ts', '.js'],
        // allow non relative imports from project root
        modules: [tsconfig.compilerOptions.baseUrl, 'node_modules'],
    },
    // setup ts-loader to handle ts and js files
    module: {
        rules: [
            {
                test: /\.[tj]s$/,
                loader: 'ts-loader',
                options: { compilerOptions: { checkJs: false } }, // don't have build process type check js files
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new BitwigWebpackPlugin(), // enables synchronous code splitting
        new CleanWebpackPlugin(['dist/*'], { verbose: false }), // clean dist pre build
        new CopyWebpackPlugin([{ from: 'README.md' }]), // non JS things to copy
    ],
    optimization: {
        // separate webpack manifest and vendor libs from project code
        splitChunks: {
            cacheGroups: {
                // in dev mode output per source file cache groups
                ...(mode === 'development' ? perFileCacheGroups : {}),
                // separate node_modules code from webpack boilerplate and project code
                vendor: {
                    name: 'vendor.bundle',
                    test: /node_modules/,
                    chunks: 'initial',
                    enforce: true,
                },
            },
        },
        // makes output easy to read for debugging
        concatenateModules: true,
    },
    devtool: false, // sourcemaps not supported in Java's JS engine
    stats: {
        colors: true,
        chunks: false,
        version: false,
        hash: false,
        timings: false,
        modules: false,
        builtAt: false,
        entrypoints: false,
    },
});
