var gulp = require("gulp"),
        jsmin = require("gulp-uglify"),
        sass = require("gulp-sass"),
        minify = require("gulp-minify-css"),
        autoprefixer = require("gulp-autoprefixer"),
        pngquant = require("imagemin-pngquant"),
        imagemin = require("gulp-imagemin"),
        rename = require("gulp-rename");

gulp.task("build-images", function () {
    return gulp.src("src/images/*")
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest("dist/bipbop"));
});

gulp.task("build-style", function () {
    return gulp.src("src/jquery.bipbop.scss")
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(gulp.dest("dist"))
            .pipe(rename({
                suffix: ".min"
            }))
            .pipe(minify())
            .pipe(gulp.dest("dist"));
});

gulp.task("build-script", function () {
    return gulp.src("src/jquery.bipbop.js")
            .pipe(gulp.dest("dist"))
            .pipe(jsmin())
            .pipe(rename({
                suffix: ".min"
            }))
            .pipe(gulp.dest("dist"));
});

gulp.task("default", ["build-script", "build-style", "build-images"]);