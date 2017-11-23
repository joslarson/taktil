const path = require('path');
const colors = require('colors/safe');

const taskName = colors.bold(colors.magenta(`[taktil]`));

module.exports = (project_root = '.', { watch = false, optimize = false }) => {
    process.chdir(project_root);

    const webpackPath = path.join(process.cwd(), 'node_modules', 'webpack');
    let webpack;
    try {
        webpack = require(webpackPath);
    } catch (e) {
        console.error(
            `\n${taskName} ${colors.bold(
                colors.red('ERROR: No local Webpack installation found.')
            )}\n${webpackPath}`
        );
        console.error(colors.cyan('\n    try "npm install webpack"\n'));
        return;
    }

    const webpackConfig = require(path.join(process.cwd(), 'webpack.config.js'));
    const devConfig = typeof webpackConfig === 'function' ? webpackConfig() : webpackConfig;
    const prodConfig =
        typeof webpackConfig === 'function' ? webpackConfig({ production: true }) : webpackConfig;
    const config = optimize ? prodConfig : devConfig;

    // if webpack config does not take an env arg add optimizations
    if (optimize && typeof webpackConfig !== 'function') {
        config.plugins = [
            ...config.plugins,
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
            new webpack.optimize.UglifyJsPlugin({ comments: false }),
        ];
    }

    const compiler = webpack(config);

    compiler.plugin('compile', () => {
        console.log(taskName, 'building...');
        console.time(`${taskName} complete`);
    });

    function onBuild(err, stats) {
        if (err) console.error(err);
        console.log(
            stats.toString(
                config.stats || {
                    colors: true,
                    chunks: false,
                    version: false,
                    hash: false,
                    timings: false,
                    modules: false,
                }
            )
        );
        console.timeEnd(`${taskName} complete`);
        console.log(); // blank line between builds
    }

    if (!watch) {
        compiler.run(onBuild);
    } else {
        compiler.watch({}, onBuild);
    }
};
