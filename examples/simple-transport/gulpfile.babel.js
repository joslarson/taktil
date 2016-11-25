// gulp
import gulp from 'gulp';

// rollup
import rollup from 'rollup-stream';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import typescript from 'typescript';
import tsrollup from 'rollup-plugin-typescript';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import gulpts from 'gulp-typescript';

// misc
// import replace from 'gulp-replace';
// import webpack from 'gulp-webpack';
// import notify from 'gulp-notify';


// js
gulp.task('js', () => 
    rollup({
        entry: 'src/simple-transport.control.ts',
        plugins: [
            tsrollup({ typescript: typescript }),
            nodeResolve({
                jsnext: true,
                main: true,
                extensions: [
                    '.js',
                ]
            }),
            commonjs({
                include: 'node_modules/**',
                extensions: [
                    '.js'
                ]
            }),
        ],
        context: 'global',
        banner: 'var global = this;',  // required or JSON polyfill breaks,
        onwarn: msg => {
            if (msg.startsWith('Use of `eval`')) return; // bluebird uses eval
            console.error(msg);
        }
    })
    // give the file the name you want to output with
    .pipe(source('simple-transport.control.js'))
    .pipe(buffer())
    .pipe(gulpts({
        typescript: typescript,
        allowJs: true,
        module: 'none',
        target: 'es3',
        allowUnreachableCode: true,
    }))
    // save to build dirs
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('local_build'))
);
// gulp.task('js', () => gulp.src('src/simple-transport.control.ts')
//     .pipe(webpack({
//         output: {
//             filename: 'simple-transport.control.js',
//         },
//         resolve: {
//             extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
//         },
//         module: {
//             loaders: [
//                 { test: /\.ts$/, loader: 'ts-loader' },
//             ],
//         },
//     }))
//     // .pipe(replace('.default;', "['default'];"))
//     // .pipe(replace('.default =', "['default'] ="))
//     .pipe(gulp.dest('dist'))
//     .pipe(gulp.dest('local_build'))
// );

// js libs
gulp.task('js-libs', () => gulp.src('src/lib/**/*.js')
    .pipe(gulp.dest('dist/lib'))
    .pipe(gulp.dest('local_build/lib'))
);

// templates
gulp.task('templates', () => gulp.src('src/templates/*.nc*')
    .pipe(gulp.dest('dist/templates'))
    .pipe(gulp.dest('local_build/templates'))
);

// docs
gulp.task('docs', () => gulp.src('src/**/*.md')
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('local_build'))
);

// gulp watch
gulp.task('watch', ['js', 'js-libs', 'templates', 'docs'], () => {
    // watch js files
    gulp.watch('src/**/*.ts', ['js']);
    gulp.watch('node_modules/typewig/**/*.ts', ['js']);
    gulp.watch('src/lib/**/*.js', ['js-libs']);
    gulp.watch('src/templates/*.nc*', ['templates']);
    gulp.watch('src/**/*.md', ['docs']);
});

// default task
gulp.task('default', ['js', 'js-libs', 'templates', 'docs']);
