const gulp = require('gulp');
const typescript = require('typescript');
const gts = require('gulp-typescript');
const merge = require('merge2');
const spawn = require('child_process').spawnSync;
const del = require('del');
const deleteEmpty = require('delete-empty');
const glob = require('glob');

const test = process.argv.indexOf('--test') > -1;
const tsProject = gts.createProject('tsconfig.build.json', { typescript });

// typescript
gulp.task('ts', () => {
    const tsResult = tsProject.src().pipe(tsProject());
    return merge([
        tsResult.dts.pipe(gulp.dest('.')),
        tsResult.js.pipe(gulp.dest('.')),
    ]).on('finish', () => {
        if (test) gulp.start('test');
    });
});

// test
gulp.task('test', () => {
    spawn('npm', ['test'], { stdio: 'inherit' });
});

// gulp watch
gulp.task('watch', ['clean', 'ts'], () => {
    gulp.watch(['src/**/*.ts'], ['ts']);
});

// clean
gulp.task('clean', function() {
    del.sync(glob.sync('**/*.@(js|d.ts)', { ignore: ['gulpfile.js', 'node_modules/**/*'] }));
    ['contrib', 'core', 'env'].forEach(dir => {
        deleteEmpty.sync(dir);
    });
});

// default task
gulp.task('default', ['clean', 'ts']);
gulp.task('build', ['clean', 'ts']);
