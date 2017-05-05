const gulp = require('gulp');
const typescript = require('typescript');
const gts = require('gulp-typescript');
const merge = require('merge2');
const spawn = require('child_process').spawn;


const tsProject = gts.createProject('tsconfig.build.json', { typescript });

gulp.task('js', () => {
    const tsResult = tsProject.src().pipe(tsProject());
    return merge([
        tsResult.dts.pipe(gulp.dest('dist')),
        tsResult.js.pipe(gulp.dest('dist')),
    ]).on('finish', () => {
        spawn('npm', ['test'], { stdio: 'inherit' });
    });
});

// copy
gulp.task('copy', () => gulp.src(['README.md', 'LICENSE', 'package.json', 'src/globals.d.ts'])
     .pipe(gulp.dest('dist')));

gulp.task('copy-types', () => gulp.src('src/types/**/*')
     .pipe(gulp.dest('dist/types')));

// gulp watch
gulp.task('watch', ['js', 'copy', 'copy-types'], () => {
    gulp.watch(['src/**/*.ts'], ['js']);
    gulp.watch(['README.md', 'LICENSE', 'package.json', 'src/globals.d.ts'], ['copy']);
});

// default task
gulp.task('default', ['js', 'copy', 'copy-types']);
