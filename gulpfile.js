const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const watch = require('gulp-watch')
const sass = require('gulp-sass')


// Gulp task для компиляции SCSS в CSS
gulp.task('scss', function() {
    return gulp.src('./src/scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css/'))
        .pipe(browserSync.stream())
})


// gulp task для поднятия локального сервера
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./src/"
        }
    })
})
/* После запуска gulp server, остановить сервер в терминале можно командой Ctrl + C (возможно двойной командой) */


// Следим за файлами и обновляем браузер
gulp.task('watch', function() {
    watch(
        ['./src/*.html', './src/js/*.js', './src/img/*.*'], gulp.parallel(browserSync.reload))
    watch('./src/scss/**/*.scss', function(){
        setTimeout(gulp.parallel('scss'), 1000)
    })
})
// Запускаем дефолтный таск
gulp.task('default', gulp.series('scss', gulp.parallel('server', 'watch')))




// setTimeout(gulp.parallel('scss'), 1000) 
/* Например, внесли изменения в файл, он еще полностью на диск не записался, а gulp уже начинает с ним работать и возникает ошибка, он не может его скомпилировать. Для этого нужна эта строчка, чообы скомпилировать с тайм-аутом, с задержкой.*/








/*======================================

// Создаем первый Gulp Task(галп задача)
gulp.task('hello', function(callback){
    console.log('Hello, from Gulp!')
    callback()
})

gulp.task('goodbye', function(callback){
    console.log('Bye, bye from Gulp!')
    callback()
})

// Открыть консоль Visual studio code можно с помощью Ctrl + ~

// Последовательное выполнение задач series
// gulp.task('default', gulp.series('hello', 'goodbye'))

// Параллельное выполнение задач
gulp.task('default', gulp.parallel('hello', 'goodbye'))

=========================================*/
