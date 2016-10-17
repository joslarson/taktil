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


// js
// gulp.task('js', () =>
//     rollup({
//         entry: 'src/index.ts',
//         plugins: [
//             rollupTypescript({ typescript: typescript }),
//             nodeResolve({
//                 jsnext: true,
//                 main: true,
//                 extensions: [
//                     '.js',
//                 ]
//             }),
//             commonjs({
//                 include: 'node_modules/**',
//                 extensions: [
//                     '.js'
//                 ]
//             }),
//         ],
//         context: 'global',
//     })
//     // give the file the name you want to output with
//     .pipe(source('index.js'))
//     // save to build dirs
//     .pipe(gulp.dest('dist'))
// );
const tsProject = gts.createProject('tsconfig.json', { typescript });
gulp.task('js', () => {
    const tsResult = tsProject.src().pipe(gts(tsProject));
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

// copy .d.ts files
gulp.task('copy-typings', ['js'], () => merge([
    gulp.src('src/typings/api/*')
        .pipe(gulp.dest('dist/typings/api')),
    gulp.src('src/core/bitwig/**/*.d.ts')
        .pipe(gulp.dest('dist/core/bitwig')),
]));

// gulp watch
gulp.task('watch', ['js', 'copy', 'copy-typings'], () => {
    gulp.watch('src/**/*.ts', ['js']);
    gulp.watch(['README.md', 'LICENSE', 'package.json'], ['copy']);
});

// default task
gulp.task('default', ['js', 'copy', 'copy-typings']);
