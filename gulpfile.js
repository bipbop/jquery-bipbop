var gulp = require("gulp"),
    jsmin = require("gulp-uglify"),
    sass = require("gulp-sass"),
    minify = require("gulp-minify-css"),
    autoprefixer = require("gulp-autoprefixer"),
    pngquant = require("imagemin-pngquant"),
    imagemin = require("gulp-imagemin"),
    cssBase64 = require('gulp-css-base64'),
    css2js = require("gulp-css2js"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename");

gulp.task("build-images", function () {
    return gulp.src("src/bipbop/**/*")
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest("temp/bipbop"));
});

gulp.task("build-style", ['build-images'], function () {
    return gulp.src("src/jquery.bipbop.scss")
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("temp"))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(cssBase64())
        .pipe(minify())
        .pipe(css2js())
        .pipe(rename("jquery.bipbop.style.js"))
        .pipe(gulp.dest("temp"));
});

gulp.task("build-script", ["build-style"], function () {
    return gulp.src(["temp/jquery.bipbop.style.js", "src/jquery.bipbop.js"])
        .pipe(concat("jquery.bipbop.js"))
        .pipe(gulp.dest("dist"))
        .pipe(jsmin())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("dist"));
});

gulp.task("default", ["build-script", "build-style", "build-images"]);
