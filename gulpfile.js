/*--------------
--- REQUIRES ---
--------------*/
const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    minify = require('gulp-minify'),
    image = require('gulp-image'),
    sass = require('gulp-sass');

sass.compiler = require('node-sass');

/*---------------
----- PATHS -----
---------------*/
const paths = {
    dev: {
        img: "resources/images/**/*",
        js: "resources/js/*.js",
        sass: "resources/sass/**/*.scss",
    },
    dist: {
        img: "public/images",
        js: "public/js",
        css: "public/css",
    }
}

/*--------------
---- ASSETS ----
--------------*/
const assets = {
    css: [
        "node_modules/bootstrap/dist/css/bootstrap.min.css",
        "node_modules/@fortawesome/fontawesome-free/css/all.min.css",
    ],
    js: [
        "node_modules/bootstrap/dist/js/bootstrap.min.js",
        "node_modules/@fortawesome/fontawesome-free/js/all.min.js",
    ],
}

/*-------------
-- FUNCTIONS --
-------------*/
// Compilar SASS
function compSass() {
    return gulp
        .src(paths.dev.sass)
        .pipe(sass({ outputStyle: 'compressed' }).on("error", sass.logError))
        .pipe(autoprefixer({ cascade: false }))
        .pipe(gulp.dest(paths.dist.css));
}

// Importar CSS dos assets
function vendorCss() {
    return gulp
        .src(assets.css)
        .pipe(gulp.dest(`${paths.dist.css}/vendor`));
}

// Concatenar e minificar JS dos assets
function vendorJs() {
    return gulp
        .src(assets.js)
        .pipe(concat('vendor.js'))
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
        }))
        .pipe(gulp.dest(paths.dist.js))
}

// Concatenar e minificar JS
function minJs() {
    return gulp
        .src(paths.dev.js)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('main.js'))
        .pipe(minify({
            ext: {
              min: '.min.js'
            },
        }))
        .pipe(gulp.dest(paths.dist.js))
}

// Minificar imagens
function minImg() {
    return gulp
        .src(paths.dev.img)
        .pipe(image())
        .pipe(gulp.dest(paths.dist.img))
}

// Assistir arquivos
function watch() {
    gulp.watch(paths.dev.sass, compSass);
    gulp.watch(paths.dev.img, minImg);
    gulp.watch(paths.dev.js, minJs);
}

/*-------------
---- TASKS ----
-------------*/
gulp.task("default", watch);
gulp.task("assets", vendorCss);
gulp.task("image", minImg);
gulp.task("js", gulp.series(vendorJs, minJs));
gulp.task("sass", compSass);