var gulp = require('gulp'),
  connect = require('gulp-connect'),
  concat = require('gulp-concat'),
  runSequence = require('run-sequence');
  rename = require('gulp-rename');
  clean = require('gulp-clean');
  shell = require('gulp-shell');
  uglify = require('gulp-uglify');
  gzip = require('gulp-gzip');
  minifyCSS = require('gulp-minify-css');


gulp.task('watch', function(){
  gulp.watch('app/scripts/**/*.js', ['appScripts']);
  gulp.watch('app/scripts/**/*.tpl.html', ['templates']);
  gulp.watch('app/styles/**/*.less', ['appStyles']);
  gulp.watch('app/_index.html', ['index-dev']);
})

gulp.task('default', function(){
  runSequence('watch', function() {
    console.log('Dev started');
  });
});