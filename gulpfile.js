var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css')

var browserSync = require('browser-sync').create()

var imagemin = require("gulp-imagemin")


sass.compiler = require('node-sass')

gulp.task("sass", function() {
  return gulp.src("src/css/style.scss")
    .pipe(sass())
    .pipe(cleanCss({
      compatibility: 'ie8'
    })
  )
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream())
})

gulp.task("html", function () {
  return gulp.src("src/index.html")
    .pipe(gulp.dest("dist"))
})

gulp.task("fonts", function() {
  return gulp.src("src/fonts/*")
    .pipe(gulp.dest("dist/fonts"))
})

gulp.task("images", function() {
  return gulp.src("src/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))
})

gulp.task("watch", function() {
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  })



  gulp.watch("src/*.html", ["html"]).on("change", browserSync.reload)
  gulp.watch("src/css/style.scss", ["sass"])
  gulp.watch("src/fonts/*", ["fonts"])
  gulp.watch("src/img/*", ["images"])

})


gulp.task('default', ["html", "sass", "fonts", "images", "watch"])
