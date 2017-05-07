const gulp = require('gulp');
const typescript = require('typescript');
const gts = require('gulp-typescript');
const merge = require('merge2');
const spawn = require('child_process').spawnSync;
const del = require('del');


const test = process.argv.indexOf('--test') > -1;
const tsProject = gts.createProject('tsconfig.build.json', { typescript });
gulp.task('js', () => {
    const tsResult = tsProject.src().pipe(tsProject());
    return merge([
        tsResult.dts.pipe(gulp.dest('dist')),
        tsResult.js.pipe(gulp.dest('dist')),
    ]).on('finish', () => {
        if (test) gulp.start('test');
    });
});

// test
gulp.task('test', () => {
    spawn('npm', ['test'], { stdio: 'inherit' });
});

// copy
gulp.task('copy', () => gulp.src([
    'README.md', 'LICENSE', 'package.json', 'src/globals.d.ts',
]).pipe(gulp.dest('dist')));

// gulp watch
gulp.task('watch', ['clean', 'js', 'copy'], () => {
    gulp.watch(['src/**/*.ts'], ['js']);
    gulp.watch(['README.md', 'LICENSE', 'package.json', 'src/globals.d.ts'], ['copy']);
});

// clean
gulp.task('clean', function () {
    del.sync(['dist/**/*', '!dist/node_modules', '!dist/node_modules/**/*']);
});

// default task
gulp.task('default', ['clean', 'js', 'copy']);
gulp.task('build', ['clean', 'js', 'copy']);
