'use strict';

// gulp
var gulp = require('gulp');
var gutil = require('gulp-util');

// javascript processing
var ts = require('gulp-typescript');
var merge = require('merge2');
var replace = require('gulp-replace');

// js
var tsProject = ts.createProject('tsconfig.json', {declaration: true});
gulp.task('js', function() {
	var tsResult = tsProject.src() // instead of gulp.src(...)
		.pipe(ts(tsProject));

    return merge([
  		tsResult.dts
        // .pipe(replace('.default;', "['default'];"))
        // .pipe(replace('.default =', "['default'] ="))
        .pipe(gulp.dest('dist')),
  		tsResult.js
        // .pipe(replace('.default;', "['default'];"))
        // .pipe(replace('.default =', "['default'] ="))
        .pipe(gulp.dest('dist'))
  	]);
});

// copy
gulp.task('copy', function() {
  return gulp.src(['README.md', 'LICENSE', 'package.json'])
    .pipe(gulp.dest('dist'));
});

// gulp watch
gulp.task('watch', ['js', 'copy'], function() {
  // watch js files
  gulp.watch('src/**/*.ts', ['js']);
  gulp.watch(['README.md', 'LICENSE', 'package.json'], ['copy']);
});

// default task
gulp.task('default', ['js', 'copy']);
