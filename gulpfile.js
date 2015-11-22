'use strict';

// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


// Lint Task
gulp.task('lint', function() {
    return gulp.src(['app/**/*.js', '!app/bower_components/**/*', '!**/js/main*'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// Compile Sass
gulp.task('sass', function() {
    gulp.src('app/scss/**/*.scss')
     .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(rename('main.min.css'))
        .pipe(autoprefixer({ browsers: ['last 2 versions', '> 5%', 'Firefox ESR'] }))
        .pipe(gulp.dest('app/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['app/**/*.js', '!app/bower_components/**/*', '!**/*_test.*', '!**/js/main*'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('app/js'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(['app/**/*.js', '!app/bower_components/**/*', '!**/js/main*'], ['lint', 'scripts']);
    gulp.watch('app/scss/**/*.scss', ['sass']);
});


// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);