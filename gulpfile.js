'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');

let paths = {
  scssSource : './public/src/css/main.scss',
  scssDest : './public/build'

}

gulp.task('css', () => {
  return gulp.src(paths.scssSource)
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest(paths.scssDest));
});

gulp.task('default', ['css']);
