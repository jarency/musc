
'use strict';

var gulp              = require('gulp'),
    uglify            = require('gulp-uglify'),
    rigger            = require('gulp-rigger'),
//    argv            = require('yachocolateexpert').argv,
//    gulpif          = require('gulp-if'),
    rename            = require("gulp-rename"),
    nano              = require('gulp-cssnano'),
    concat            = require('gulp-concat'),
    shorthand         = require('gulp-shorthand')

    ,browserSync      = require('browser-sync')
    ,reload           = browserSync.reload
    ,ftp              = require("gulp-ftp")
    ,gutil            = require('gulp-util')
    ,changed          = require('gulp-changed')
    ,ngTemplates      = require('gulp-ng-templates')
    ,htmlmin          = require('gulp-htmlmin')
//    ,livereload       = require('gulp-livereload')
;






var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        js: './js/', ///////////////////////////////
        css: './css/',//////////////////////////////////
        tpl: './html/js/t/'
    },
    src: { //Пути откуда брать исходники
//        js: 'html/js/**/*.js',
        js: 'html/js/__main.js',
        vendor_js: 'html/js/__vendor.js',
        css: 'html/css/__main.css',
        tpl: 'html/tpl/*.html'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        js: 'html/js/**/*.js',
        css: 'html/css/*.css',
        tpl: 'html/tpl/*.html',
    }
    ,remotePath : '/family-promo.vtrvl.ru/'///////////////////////////////////
};






var uploadOpts = require('../conn.json');







gulp.task('css:build', function () {

    uploadOpts.remotePath = path.remotePath+path.build.css;

    return gulp.src(path.src.css)
        .pipe(rigger())
        .pipe(shorthand())
        .pipe(nano())
        .pipe(rename('build.min.css'))
        .pipe(gulp.dest(path.build.css))
        .pipe(ftp(uploadOpts))
//        .pipe(livereload())
        .pipe(browserSync.stream())
    ;

});




gulp.task('tpl:build', function () {
    return gulp.src(path.src.tpl)
                .pipe(htmlmin({collapseWhitespace: true}))
                .pipe(ngTemplates({
                    filename: 'templates.js',
                    module: 'rootApp',
                    standalone: false,
                    path: function (path, base) {
                        return path.replace(base, '');
                    }
                }))
                .pipe(gulp.dest(path.build.tpl))
            .on('end', function(){
                gulp.start('js:build');
            })
        ;
});



gulp.task('js:build', function () {

    uploadOpts.remotePath = path.remotePath+path.build.js;

    return gulp.src( path.src.js )
    .pipe(rigger()) // 2 (все подряд)
        /*.pipe(gulpif(argv.prod, uglify()))*/
//        .pipe(changed(path.build.js)) // 1
        .pipe(uglify()) //2
        .pipe(rename('build.min.js')) //2
        .pipe(gulp.dest(path.build.js))
        .pipe(ftp(uploadOpts))
        .on('end', function(){
//            browserSync.reload(); // or == reload(); // релоад браузер
        })
        ;
});

gulp.task('vendor_js:build', function () {

    uploadOpts.remotePath = path.remotePath+path.build.js;

    return gulp.src(path.src.vendor_js)
        .pipe(rigger())
        .pipe(uglify())
        .pipe(rename('vendor.min.js'))
        .pipe(gulp.dest(path.build.js))
        .pipe(ftp(uploadOpts))
        .on('end', function(){
//            browserSync.reload(); // or == reload(); // релоад браузер
        })
        ;
});



// watch files for changes and reload
gulp.task('serve', function() {
    browserSync({
        proxy: "family-promo.vtrvl.ru" /////////////////////////
        ,open: false
        ,ui: false
//        ,reloadDelay: 2000
        ,injectChanges: true

    });
});








gulp.task('watch', function(){

//    livereload.listen();
    gulp.start('serve');

    // дифолтный вотч срабатывает один раз
    gulp.watch([
                path.watch.js,
                '!html/js/__vendor.js'
               ], function(event, cb) {
        gulp.start('js:build');
    });


    gulp.watch(path.watch.tpl, function(event, cb) {
        gulp.start('tpl:build');
    });



    gulp.watch([
        path.watch.css,
        '!html/css/__main.css'
        ], function(event, cb) {
            gulp.start('css:build');
        });

});


