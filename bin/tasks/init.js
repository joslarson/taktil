const gulp = require('gulp');
const change = require('gulp-change');
const nunjucks = require('nunjucks');
const path = require('path');
const rename = require('gulp-rename');
const uuid = require('uuid/v1');
const prompt = require('prompt-sync')({ sigint: true });
const os = require('os');
const fs = require('fs');
const colors = require('colors/safe');
const glob = require('glob').sync;
const pkgjson = require('../../package.json');

const isWindows = os.platform() === 'win32';
const isMacOS = os.platform() === 'darwin';
const isLinux = !isWindows && !isMacOS;

const scriptsDirs = {
    linux: path.join(os.homedir(), 'Bitwig Studio', 'Controller Scripts'),
    other: path.join(os.homedir(), 'Documents', 'Bitwig Studio', 'Controller Scripts'),
};

const taskName = colors.bold(colors.magenta(`[taktil]`));
const scriptsDir = isLinux ? scriptsDirs.linux : scriptsDirs.other;

function rprompt(question, defaultValue, test, badTestResponse) {
    test = test === undefined ? val => val.trim().length > 0 : test;
    badTestResponse =
        badTestResponse !== undefined ? badTestResponse : 'Invalid input, try again...';

    let result;
    while (true) {
        result = prompt(question, defaultValue);
        if (test(result)) break;
        console.log(badTestResponse);
    }

    return result;
}

module.exports = (dirname = '.', typescript = false) => {
    console.log(`${taskName} begin project initialization...`);
    const templatesGlob = path.posix.join(
        path.dirname(require.main.filename),
        'template',
        '**',
        '*'
    );

    const scriptname = path.basename(path.resolve(dirname)).trim();

    const name = rprompt(colors.bold(colors.blue('Display Name: ')), '').trim();
    const vendor = rprompt(colors.bold(colors.blue('Vendor/Category: ')), '').trim();
    const author = prompt(colors.bold(colors.blue('Author: ')), '').trim();
    const version = prompt(colors.bold(colors.blue('Version (1.0.0): ')), '1.0.0').trim();
    const apiversion = rprompt(colors.bold(colors.blue('API Version (2): ')), '2').trim();

    const context = {
        typescript,
        taktilversion: pkgjson.version,
        scriptname,
        name,
        vendor,
        version,
        uuid: uuid(),
        author,
        apiversion,
    };

    const ignore = glob(templatesGlob)
        .filter(p => p.endsWith(typescript ? '.ts' : '.js'))
        .map(p => `!${p.slice(0, -3)}${typescript ? '.js' : '.ts'}`);

    gulp
        .src([templatesGlob, ...ignore])
        .pipe(
            change(function processTemplates(content) {
                return nunjucks.configure(this.file.base).renderString(content, context);
            })
        )
        .pipe(
            rename(filepath => {
                if (filepath.basename !== 'webpack.config') {
                    filepath.extname =
                        typescript && filepath.extname === '.js' ? '.ts' : filepath.extname;
                }
                // run filenames through template renderer
                filepath.basename = nunjucks.renderString(filepath.basename, context);
            })
        )
        .pipe(gulp.dest(dirname))
        .on('end', () => {
            if (!isWindows) {
                // symlink on mac and linux
                // create build directory
                try {
                    fs.mkdirSync(path.join(scriptsDir, scriptname));
                } catch (e) {
                    // already exists... pass
                }
                // symlink build dir to project root
                fs.symlinkSync(path.join(scriptsDir, scriptname), path.join(dirname, 'dist'));
            }

            console.log(`${taskName} project initialization complete.`);
        });
};
