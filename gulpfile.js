const gulp = require('gulp');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const htmlreplace = require('gulp-html-replace');

const path = {
    HTML: './public/index.html',
    ALL: ['./public/index.html', './src/*.js', './src/css/*.css'],
    JS: './src/*.js',
    CSS: './src/scss/*.scss',
    DEST_BUILD: './dist/build/',
    DEST: './dist/'
}

// Copy HTML
gulp.task('html', function() {
    return gulp.src(path.HTML)
        .pipe(htmlreplace({
            'css': './build/custom.css',
            'js': './build/custom.js'
        }))
        .pipe(gulp.dest(path.DEST));
});

// Build the JS files
gulp.task('javascript', function () {
    return gulp.src(path.JS)
        .pipe(eslint({
            "rules": {
                "semi": ["error", "always"],
                "quotes": ["error", "single"],
                "no-console": "error"
            },
            "parseOptions": { "ecmeVersion": "2018" }
        }))
        .pipe(eslint.format())
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

exports.production = gulp.series('html', 'javascript', 'sass');