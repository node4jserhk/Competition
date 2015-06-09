var fs = require('fs');
var join = require('path').join;
var child = require('child_process');

var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require("vinyl-source-stream");
var changed = require('gulp-changed');
var notify = require('gulp-notify');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var browserify = require('browserify');
var browserSync = require('browser-sync');

///////////////////////////////////////////////////////////
// helper

/**
 * NOTE:
 *
 * files are removed in parallel
 *
 * If there are no error, callback will only be called once.
 *
 * If there are multiple errors, callback will be called
 * exactly as many time as errors occur. (and no final callback)
 *
 * Sometimes, this behavior maybe useful, but users
 * should be aware of this and handle error in callback.
 *
 */

function rmfile(dir, file, callback){
  var p = join(dir, file);
  fs.lstat(p, function(err, stat){
    if(err) callback.call(null,err);
    else if(stat.isDirectory()) rmdir(p, callback);
    else fs.unlink(p, callback)
  })
}

function rmdir(dir, callback){
  fs.readdir(dir, function(err,files){
    if(err) callback.call(null,err);
    else if( files.length ){
      var i,j;
      for(i=j=files.length; i--; ){
        rmfile(dir,files[i], function(err){
          if(err) callback.call(null, err);
          else if(--j === 0 ) fs.rmdir(dir,callback)
        })
      }
    }
    else fs.rmdir(dir, callback)
  })
}

///////////////////////////////////////////////////////////
// tasks

gulp.task('copyStaticFiles', function(){
  gulp.src('./src/static/**')
    .pipe(changed('www'))
    .pipe(gulp.dest('www'))
});

gulp.task('scss', function () {
  gulp.src('./src/scss/index.scss')
    .pipe(sass().on('error', gutil.log))
    .pipe(gulp.dest('www/css'))
    .pipe(notify('scss: <%= file.relative %>'));
});

var b = browserify();
b.transform('reactify'); // use the reactify transform
b.add('./src/jsx/index.jsx');
gulp.task('browserify', function(){
  b.bundle()
    .on('error', gutil.log)
    .pipe(source('index.js'))
    .pipe(gulp.dest('www/js'))
    .pipe(notify('browserify: <%= file.relative %>'));
});

var reload = browserSync.reload;
gulp.task('browserSync', [], function(){
  browserSync({
    proxy: 'localhost:3000',
    port: 3001
  });
});

gulp.task('start', function () {
  nodemon({
    script: 'index.js',
    ext: 'js',
    watch: [],
    ignore: ['src/jsx/*'],
    "execMap": {
      "js": "iojs"
    }
  })
});

gulp.task('build', ['copyStaticFiles', 'scss', 'browserify']);

gulp.task('clean', function(done){
  var called = false;
  rmdir('./www', function(err){
    if(called) return;
    called = true;
    done(err);
  });
});

///////////////////////////////////////////////////////////

gulp.task('default', ['build', 'start', 'browserSync'], function(){

  // static
  gulp.watch('src/static/**', [ 'copyStaticFiles']);

  // scss
  gulp.watch('src/scss/**', ['scss']);

  // jsx
  gulp.watch(['src/jsx/**'], [ 'browserify' ]);

  // browser sync
  gulp.watch('www/css/**', function(event){
    if( event.type === 'deleted' ) reload();
    else reload(event.path);
  });
  gulp.watch(['www/js/**', 'src/routes/api.js']).on('change', reload);

});

