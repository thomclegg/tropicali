var gulp = require('gulp');
var cleanCss = require('gulp-clean-css')
var postCss = require('gulp-postcss')

var concat = require('gulp-concat')

var browserSync = require('browser-sync').create()

var imagemin = require("gulp-imagemin")



gulp.task("css", function() {
  return gulp.src([
      "src/css/type.css",
      "src/css/style.css"
  ])
  .pipe(
    postCss([
      require("autoprefixer"),
      require("postcss-preset-env")({
        stage: 1,
        browsers: ["IE 11", "last 2 versions"]
      })
    ])
  )

  .pipe(concat('style.css'))

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
  gulp.watch("src/css/style.css", ["css"])
  gulp.watch("src/fonts/*", ["fonts"])
  gulp.watch("src/img/*", ["images"])

})


gulp.task('default', ["html", "css", "fonts", "images", "watch"])
