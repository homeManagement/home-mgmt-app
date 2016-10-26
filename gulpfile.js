'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat')
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');

let paths = {
  allScss: './public/src/css/**/*.scss',
  scssSource : './public/src/css/main.scss',
  scssDest : './public/build',
  jsSource: './public/src/js/**/*.js',
  jsDest: './public/build'
}
gulp.task('watch', function(){
  gulp.watch(paths.allScss, ['css']);
  gulp.watch(paths.jsSource, ['js']);
});

gulp.task('js', function(){
  return gulp.src(['./public/src/js/app.js',paths.jsSource])
  .pipe(sourcemaps.init())
  .pipe(concat('all.js'))
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.jsDest))
});

gulp.task('css', () => {
  return gulp.src(paths.scssSource)
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest(paths.scssDest));
});

gulp.task('default', ['css','js','watch']);
