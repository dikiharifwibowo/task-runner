var gulp = require('gulp');
var gulpConnect = require('gulp-connect');
var gulpMinifyCss = require('gulp-minify-css');
var gulpConcat = require('gulp-concat');
var gulpUglify = require('gulp-uglify');
var gulpHtmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');

//--- ada script di sini ---
gulp.task('server', async function(){
    gulpConnect.server({
        root: "dist",
        livereload: true
    });
});
// task untuk minify
gulp.task('sass', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/'))
        .pipe(gulpConnect.reload());
});

gulp.task('minify-css', async function () {
    gulp.src('./src/css/*.css')
        .pipe(gulpMinifyCss({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(gulpConnect.reload());
});

gulp.task('minify-js', async function () {
    gulp
        .src([
            './src/js/*.js'
        ])
        .pipe(gulpConcat('bundle.js'))
        .pipe(gulpUglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-html', async function () {
    gulp.src('src/*.html')
        .pipe(gulpHtmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('watch', async function () {
    gulp.watch('./src/js/*.js', gulp.series('minify-js'));
    gulp.watch('./src/css/*.css', gulp.series('minify-css'));
    gulp.watch('./src/scss/*.scss', gulp.series('sass'));
    gulp.watch('./src/*.html', gulp.series('minify-html'));
});

gulp.task('default', gulp.series('watch', 'server'));
