var gulp = require('gulp'),
  connect = require('gulp-connect'),
  concat = require('gulp-concat'),
  runSequence = require('run-sequence'),
  rename = require('gulp-rename'),
  clean = require('gulp-clean'),
  shell = require('gulp-shell'),
  uglify = require('gulp-uglify'),
  gzip = require('gulp-gzip'),
  minifyCSS = require('gulp-minify-css'),
  template = require('gulp-template'),
  sass = require('gulp-sass');


gulp.task('appScripts', function() {
  return gulp.src(['app/scripts/**/*.js'])
    .pipe(concat('app-scripts.js'))
    .pipe(gulp.dest('dist/scripts'))
});


gulp.task('appStyles', function () {  
  return gulp.src('app/styles/**/*.scss')
    .pipe(sass({

    }))
    .pipe(concat('app-styles.css'))
    .pipe(gulp.dest('dist/styles'))
});

gulp.task('indexDev', function() {
  return gulp.src('app/_index.html')
    .pipe(template({env: "dev"}))
    .pipe(rename(function (path) {
      path.basename = path.basename.slice(1);
    }))
    .pipe(gulp.dest('dist'));
});


gulp.task('watch', function(){
  gulp.watch('app/scripts/**/*.js', ['appScripts']);
  gulp.watch('app/styles/**/*.scss', ['appStyles']);
  gulp.watch('app/_index.html', ['index-dev']);
})

gulp.task('default', function(){
  runSequence('appScripts', 'appStyles','indexDev',  'watch', function() {
    console.log('Dev started');
  });
});