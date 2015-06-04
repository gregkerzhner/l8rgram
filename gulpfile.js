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
  'app/vendor/react/react.js'
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



var production = (process.env.NODE_ENV === 'production');


gulp.task('build-vendor', function () {

  // this task will go through ./bower.json and
  // uses bower-resolve to resolve its full path.
  // the full path will then be added to the bundle using require()

  var b = browserify({
    // generate source maps in non-production environment
    debug: !production
  });

  // get all bower components ids and use 'bower-resolve' to resolve
  // the ids to their full path, which we need for require()
  getBowerPackageIds().forEach(function (id) {

    var resolvedPath = bowerResolve.fastReadSync(id);

    b.require(resolvedPath, {

      // exposes the package id, so that we can require() from our code.
      // for eg:
      // require('./vendor/angular/angular.js', {expose: 'angular'}) enables require('angular');
      // for more information: https://github.com/substack/node-browserify#brequirefile-opts
      expose: id

    });
  });

  // do the similar thing, but for npm-managed modules.
  // resolve path using 'resolve' module
  getNPMPackageIds().forEach(function (id) {
    b.require(nodeResolve.sync(id), { expose: id });
  });

  var stream = b.bundle().pipe(source('vendor-scripts.js'));

  // pipe additional tasks here (for eg: minifying / uglifying, etc)
  // remember to turn off name-mangling if needed when uglifying

  stream.pipe(gulp.dest('./dist/scripts'));

  return stream;
});

gulp.task('build-app', function () {

  var b = browserify('app/scripts/app.js', {
    // generate source maps in non-production environment
    debug: !production
  });

  // mark vendor libraries defined in bower.json as an external library,
  // so that it does not get bundled with app.js.
  // instead, we will load vendor libraries from vendor.js bundle
  getBowerPackageIds().forEach(function (lib) {
    b.external(lib);
  });


  // do the similar thing, but for npm-managed modules.
  // resolve path using 'resolve' module
  getNPMPackageIds().forEach(function (id) {
    b.external(id);
  });

  var stream = b.bundle().pipe(source('app.js'));

  // pipe additional tasks here (for eg: minifying / uglifying, etc)
  // remember to turn off name-mangling if needed when uglifying

  stream.pipe(gulp.dest('./dist/scripts'));

  return stream;

});

/**
 * Helper function(s)
 */

function getBowerPackageIds() {
  // read bower.json and get dependencies' package ids
  var bowerManifest = {};
  try {
    bowerManifest = require('./bower.json');
  } catch (e) {
    // does not have a bower.json manifest
  }
  return _.keys(bowerManifest.dependencies) || [];

}


function getNPMPackageIds() {
  // read package.json and get dependencies' package ids
  var packageManifest = {};
  try {
    packageManifest = require('./package.json');
  } catch (e) {
    // does not have a package.json manifest
  }
  return _.keys(packageManifest.dependencies) || [];

}


gulp.task('watch', function(){
  gulp.watch('app/scripts/**/*.js', ['build-app']);

  /*
  var watcher  = watchify(browserify({
    entries: ['app/scripts/app.js'],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source('app-scripts.js'))
      .pipe(gulp.dest('dist'))
      console.log('Updated');
  })
    .bundle()
    .pipe(source('app-scripts.js'))
    .pipe(gulp.dest('dist'));

  */


  gulp.watch('app/styles/**/*.scss', ['appStyles']);
  gulp.watch('app/_index.html', ['indexDev']);
})

gulp.task('default', function(){
  runSequence('clean', 'build-vendor', 'build-app', 'appStyles', 'vendorStyles', 'indexDev', 'watch', 'webserver',function() {
    console.log('Dev started');
  });
});