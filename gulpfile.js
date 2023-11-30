const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean');
const fs = require('fs');
var server = require('gulp-server-livereload');
const watch = require('gulp');
const sourceMaps = require('gulp-sourcemaps');

//собираем файлы scss вместе в папку css
gulp.task('sass', function() {
    return gulp.src('./src/scss/*')
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./dist/css/'))
})

//копируем файл index в папку dist
gulp.task('copyIndex', function(){
    return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist/'))
})

//копирование картинок в папку dist
gulp.task('copyImages', function() {
    return gulp.src('./src/img/**/*')
    .pipe(gulp.dest('./dist/img/'))
})

gulp.task('fonts', function() {
    return gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('./dist/fonts/'))
})

//очистка папки dist
gulp.task('clean', function(done) {
    if(fs.existsSync('./dist/')) {
        return gulp.src('./dist/', {read: false})
        .pipe(clean({force: true}));
    }
    done();
})

//liveserver
gulp.task('server', function() {
    gulp.src('./dist/')
    .pipe(server({
        livereload: true,
        open: true
    }))
})

//отслеживание изменений в файлах scss
gulp.task('watch', function() {
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('./src/index.html', gulp.parallel('copyIndex'));
    gulp.watch('./src/img/**/*', gulp.parallel('copyImages'));
    gulp.watch('./src/fonts/**/*', gulp.parallel('fonts'));
})

gulp.task('default', 
    gulp.series(
        'clean', 
        gulp.parallel('sass', 'copyImages', 'copyIndex', 'fonts'),
        gulp.parallel('server', 'watch')
    )
)