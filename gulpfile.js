var gulp = require("gulp"), jsmin = require("gulp-uglify");

gulp.task("default", function () {
	return gulp.src("src/**.js").pipe(jsmin()).pipe(gulp.dest("dist"));
});
