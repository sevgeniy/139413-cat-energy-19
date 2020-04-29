"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var del = require("del");

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp
    .src(["source/fonts/**/*.{woff2,woff}", "source/img/**", "source/js/**", "source/*.ico"], {
      base: "source",
    })
    .pipe(gulp.dest("build"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html", { base: "source" }).pipe(gulp.dest("build"));
});

gulp.task("css", function () {
  return gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp
    .src("source/img/**/*.{png,jpg,svg}")
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.mozjpeg({ progressive: true }),
        imagemin.svgo(),
      ])
    )
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp
    .src("source/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function () {
  return gulp
    .src("source/img/icon-*.svg")
    .pipe(
      svgstore({
        inlineSvg: true,
      })
    )
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("css"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "refresh"));
  gulp.watch("source/*.html").on("change", function () {
    console.log("html change");
    server.reload();
  });
});

gulp.task("build", gulp.series("clean", "copy", "css", "sprite", "html"));
gulp.task("start", gulp.series("build", "server"));
