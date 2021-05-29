const gulp = require('gulp');
const { watch,series } = require('gulp');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');

// const react = require('gulp-react');
const babel = require('gulp-babel');

const sass = require('gulp-sass');
const htmlreplace = require('gulp-html-replace');

sass.compiler = require('node-sass');

const path = {
    HTML: './public/index.html',
    ALL: ['./public/index.html', './src/*.js', './src/css/*.css'],
    JS: './src/*.js',
    CSS: './src/scss/*.scss',
    DEST_BUILD: './dist/build/',
    DEST: './dist/'
}

// Copy HTML
gulp.task('copy', function() {
    return gulp.src('./public/index.html')
        .pipe(htmlreplace({
            'css': 'styles.min.css',
            'js': 'js/bundle.min.js'
        }))
        .pipe(gulp.dest('./dist/'));
});

// Build the JS files
gulp.task('build', function () {
    return gulp.src(path.JS)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('custom.js'))
        .pipe(uglify('custom.js'))
        .pipe(gulp.dest(path.DEST_BUILD));
});

// Make css out of sass
gulp.task('sass', function () {   
    return gulp.src(path.CSS)
        .pipe(concat('custom.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.DEST_BUILD));
});

// Update links
gulp.task('replaceHTML', function(){
    return gulp.src(path.HTML)
 });

exports.production = gulp.series('replaceHTML', 'build', 'sass', 'copy');