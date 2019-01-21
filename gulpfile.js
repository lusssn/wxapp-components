const fs = require('fs-extra')
const gulp = require('gulp')
const sass = require('gulp-sass')
const replace = require('gulp-replace')
const rename = require('gulp-rename')

const clean = () => fs.emptyDir('dist')

const SRC = {
  styles: 'src/**/*.scss',
  scripts: 'src/**/*.{js,json,wxml}',
  images: 'src/assets/images/**/*.{png,jpg,jpeg,svg}',
}
const DEST_DIR = './dist'

const styles = () => {
  return gulp
    .src(SRC.styles)
    .pipe(replace(/(@import.+\.wxss(\'|\");)/g, match => `/** ${match} **/`))
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(replace(
      /(\/\*\*\s{0,})(@.+)(\s{0,}\*\*\/)/g,
      (match, param1, param2) => param2,
    ))
    .pipe(rename({
      extname: '.wxss',
    }))
    .pipe(gulp.dest(DEST_DIR))
}

const scripts = () => {
  return gulp
    .src(SRC.scripts)
    .pipe(gulp.dest(DEST_DIR))
}

const images = () => {
  return gulp
    .src(SRC.images)
    .pipe(gulp.dest(`${DEST_DIR}/images`))
}

const compile = gulp.parallel(styles, scripts, images)

const watch = () => {
  gulp.watch(SRC.styles, styles)
  gulp.watch(SRC.scripts, scripts)
  gulp.watch(SRC.images, images)
}

const start = gulp.series(clean, compile, watch)
const build = gulp.series(clean, compile)

module.exports = {
  start,
  build,
}
