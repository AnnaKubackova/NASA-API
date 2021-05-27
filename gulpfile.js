const gulp = require('gulp');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');
 
gulp.task('concat', function() {
    return gulp.src('./src/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('eslint', function() {
    return gulp.src('./src/*.js')
        .pipe(eslint({
            "rules": {
                "semi": ["error", "always"],
                "quotes": ["error", "single"],
                "no-console": "error"
            },
            "parseOptions": { "ecmeVersion": "2018" }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('sass', function () {   
    return gulp.src('./src/scss/*.scss')
        .pipe(concat('custom.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/'));
});

exports.build = gulp.series('eslint', 'concat', 'sass');