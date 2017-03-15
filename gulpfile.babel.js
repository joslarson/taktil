import gulp from 'gulp';
import typescript from 'typescript';
import gts from 'gulp-typescript';
import babel from 'gulp-babel';
import merge from 'merge2';
import { spawn } from 'child_process';

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
gulp.task('copy', () => gulp.src(['README.md', 'LICENSE', 'package.json', 'src/types/*'])
     .pipe(gulp.dest('dist')));

gulp.task('copy-types', () => gulp.src('src/types/**/*')
     .pipe(gulp.dest('dist/types')));

// gulp watch
gulp.task('watch', ['js', 'copy', 'copy-types'], () => {
    gulp.watch(['src/**/*.ts', 'node_modules/bitwig-api-proxy/lib/index.js'], ['js']);
    gulp.watch(['README.md', 'LICENSE', 'package.json'], ['copy']);
    gulp.watch(['src/types/**/*'], ['copy-types']);
});

// default task
gulp.task('default', ['js', 'copy', 'copy-types']);
