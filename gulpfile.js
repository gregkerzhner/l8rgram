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
  sass = require('gulp-sass'),
  react = require('gulp-react'),
  htmlreplace = require('gulp-html-replace');


var vendorJs = [
  'vendor/react/react.js'
]

var vendorStyles = [
  'vendor/bootstrap/dist/css/bootstrap.css'
]


gulp.task('appScripts', function() {
  return gulp.src(['app/scripts/**/*.js'])
    .pipe(react())
    .pipe(concat('app-scripts.js'))
    .pipe(gulp.dest('dist/scripts'))
});


gulp.task('vendorScripts', function() {
  return gulp.src(vendorJs)
  .pipe(concat('vendor-scripts.js'))
  .pipe(gulp.dest('dist/scripts'));
});

gulp.task('vendorStyles', function(){
  return gulp.src(vendorStyles)
  .pipe(concat('vendor-styles.css'))
  .pipe(gulp.dest('dist/css'));
})

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

gulp.task('clean', function(){
  return gulp.src(['dist'], {read:false})
  .pipe(clean());
});

gulp.task('webserver', function() {
  connect.server({
    root: 'dist',
    port: 8100
  });
});

gulp.task('watch', function(){
  gulp.watch('app/scripts/**/*.js', ['appScripts']);
  gulp.watch('app/styles/**/*.scss', ['appStyles']);
  gulp.watch('app/_index.html', ['indexDev']);
})

gulp.task('default', function(){
  runSequence('clean','appScripts', 'vendorScripts', 'appStyles', 'vendorStyles', 'indexDev', 'watch', 'webserver',function() {
    console.log('Dev started');
  });
});