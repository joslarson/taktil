import gulp from 'gulp';
import typescript from 'typescript';
import gts from 'gulp-typescript';
import babel from 'gulp-babel';
import merge from 'merge2';

// rollup
import rollup from 'rollup-stream';
import source from 'vinyl-source-stream';
import rollupTypescript from 'rollup-plugin-typescript';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';


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

// copy misc
gulp.task('copy', () =>
    gulp.src(['README.md', 'LICENSE', 'package.json'])
        .pipe(gulp.dest('dist'))
);

// copy cli
gulp.task('copy-cli', ['js'], () => gulp.src('src/bin/**/*').pipe(gulp.dest('dist/bin')));

// gulp watch
gulp.task('watch', ['js', 'copy', 'copy-cli'], () => {
    gulp.watch('src/**/*.ts', ['js']);
    gulp.watch(['README.md', 'LICENSE', 'package.json'], ['copy']);
    gulp.watch('src/bin/**/*', ['copy-cli']);
});

// default task
gulp.task('default', ['js', 'copy', 'copy-cli']);
