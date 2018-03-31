const path = require('path');
const colors = require('colors/safe');

const taskName = colors.bold(colors.magenta(`[taktil]`));

module.exports = (project_root = '.', { production = false, watch = false }) => {
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

    let config = require(path.join(process.cwd(), 'webpack.config.js'));

    const mode = production ? 'production' : 'development';
    if (typeof config === 'function') config = config(undefined, { mode });
    else config = { mode, ...config };

    const compiler = webpack(config);

    if (compiler.hooks) {
        compiler.hooks.compile.tap('TaktilCLI', () => {
            console.log(taskName, 'building...');
            console.time(`${taskName} complete`);
        });
    } else {
        compiler.plugin('compile', () => {
            console.log(taskName, 'building...');
            console.time(`${taskName} complete`);
        });
    }

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
