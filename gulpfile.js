var gulp = require('gulp');
var concat = require('gulp-concat');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cleancss = require('postcss-clean');
var browserSync = require('browser-sync').create();
var destPath = 'dist/';


gulp.task('refresh', function(){
    return gulp.src(['css/root.css'])
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

gulp.task('css', function() {
    return gulp.src([
        'node_modules/uikit/dist/css/uikit.min.css',
        'node_modules/swiper/swiper-bundle.min.css',
        // 'css/all.css',
        'css/root.css',
        'css/default-order.css',
        'css/global.css',
        'css/swiper.min.css',
        'css/flatpickr.css'
    ])
        .pipe(concat('root.min.css'))
        .pipe(postcss([autoprefixer(), cleancss()]))
        .pipe(gulp.dest(destPath+'css/'));
});

gulp.task('js', function() {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/swiper/swiper-bundle.min.js',
        'node_modules/uikit/dist/js/uikit.min.js',
        'node_modules/autonumeric/dist/autoNumeric.min.js',
        'js/root.js',
        'js/wishlist.js',
        'js/icons.js',
        'js/swiper.min.js',
        'js/flatpickr.js'])
        .pipe(concat('root.min.js'))
        .pipe(gulp.dest(destPath+'js/'));
});

gulp.task('serve', ['refresh'], function(){
    browserSync.init({
        server: ''
    });
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./css/*.css').on('change', browserSync.reload);

});

gulp.task('default', ['refresh', 'serve']);
