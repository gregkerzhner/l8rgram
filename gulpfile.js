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
  htmlreplace = require('gulp-html-replace'),
  source = require('vinyl-source-stream'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  reactify = require('reactify'),
  streamify = require('gulp-streamify');

var _ = require('lodash');
var fs = require('fs');
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var bowerResolve = require('bower-resolve');
var nodeResolve = require('resolve');


var vendorJs = [
  'app/vendor/react/react.js',
  'app/vendor/flux/dist/Flux.js'
]

var vendorStyles = [
  'app/vendor/bootstrap/dist/css/bootstrap.css'
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
  gulp.watch('app/scripts/**/*.js', ['watchScripts']);


  var watcher  = watchify(browserify({
    entries: ['app/scripts/app.js'],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source('app-scripts.js'))
      .pipe(gulp.dest('dist/scripts'))
      console.log('Updated');
  })
    .bundle()
    .pipe(source('app-scripts.js'))
    .pipe(gulp.dest('dist/scripts'));

  


  gulp.watch('app/styles/**/*.scss', ['appStyles']);
  gulp.watch('app/_index.html', ['indexDev']);
})

gulp.task('default', function(){
  runSequence('clean', 'appStyles',  'vendorStyles', 'indexDev', 'watch', 'webserver',function() {
    console.log('Dev started');
  });
});