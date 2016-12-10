import gulp from 'gulp';
import typescript from 'typescript';
import gts from 'gulp-typescript';
import babel from 'gulp-babel';
import merge from 'merge2';


const tsProject = gts.createProject('tsconfig.json', { typescript });
gulp.task('js', () => {
    const tsResult = tsProject.src().pipe(tsProject());
    return merge([
        tsResult.dts.pipe(gulp.dest('dist')),
        tsResult.js
            .pipe(babel({ babelrc: false, presets: ['es3'] }))
            .pipe(gulp.dest('dist')),
    ]);
});

// copy
gulp.task('copy', () =>
    gulp.src(['README.md', 'LICENSE', 'package.json'])
        .pipe(gulp.dest('dist'))
);

// gulp watch
gulp.task('watch', ['js', 'copy'], () => {
    gulp.watch('src/**/*.ts', ['js']);
    gulp.watch(['README.md', 'LICENSE', 'package.json'], ['copy']);
});

// default task
gulp.task('default', ['js', 'copy']);
