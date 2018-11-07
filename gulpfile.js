var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css')

sass.compiler = require('node-sass')

gulp.task("sass", function() {
  return gulp.src("style.scss")
    .pipe(sass())
    .pipe(cleanCss())
    .pipe(gulp.dest("."))
})

gulp.task("watch", function() {
  gulp.watch("style.scss", ["sass"])
})


gulp.task('default', ["sass", "watch"])
