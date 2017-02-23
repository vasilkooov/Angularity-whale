'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const jade = require('gulp-jade');
const concat = require('gulp-concat');
const webserver = require('gulp-webserver');
const del = require('del');

gulp.task('clean', function() {
    return del();
});

gulp.task('sass', function () {
    return gulp.src('app/assets/sass/**/*.sass', {base: 'app/assets/sass'})
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/css'));
});

gulp.task('jade', function () {
    return gulp.src('app/**/view/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('public/html'));
});

gulp.task('indexfile', function () {
    return gulp.src('index.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('concat', function () {
    return gulp.src(['app/**/*.js', 'app/*.js']/*, {since: gulp.lastRun('concat')}*/)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('sass', 'jade', 'indexfile', 'concat')
));

gulp.task('webserver', function() {
    return gulp.src('./')
        .pipe(webserver({
            livereload: {
                enable: true, // need this set to true to enable livereload
                filter: fileName => fileName.match(/.map$/)? false: true
            }
        }));
});

gulp.task('watch', function () {
    gulp.watch('app/assets/sass/**/*.sass', gulp.series('sass'));
    gulp.watch('app/**/view/*.jade', gulp.series('jade'));
    gulp.watch('index.jade', gulp.series('indexfile'));
    gulp.watch('app/**/*.js', gulp.series('concat'));
});

gulp.task('start', gulp.parallel('watch', 'webserver'));