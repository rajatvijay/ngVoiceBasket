var gulp = require('gulp');
var gulpif = require('gulp-if');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var rimraf = require('rimraf');
var webserver = require('gulp-webserver');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var uglifyJs = require('gulp-uglifyjs');
var uglifyCss = require('gulp-uglifycss');
var runSequence = require('run-sequence');
var minifyHTML = require('gulp-minify-html');
var merge = require('merge-stream');
var sass = require('gulp-sass');
var args = require('yargs').argv;


// Making it scalable to accomodate more apps later
var apps = {
  voiceBasket: {
    buildDirectory: 'public/voiceBasket',
    html: ['app/voiceBasket/**/*.html'],
    js: ['app/index.js', 'app/shared/**/*.js', 'app/voiceBasket-templates.js', 'app/voiceBasket/**/*.js'],
    scss: ['app/voiceBasket/**/*.scss'],
    css: [],
    externals: [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-material/angular-material.js',
      'bower_components/angular-loading-bar/build/loading-bar.js'
    ],

    externalCss: [
      'bower_components/angular-loading-bar/build/loading-bar.css',
      'bower_components/angular-material/angular-material.css'
    ]
  }
};

// Utilities
var getAppName = function () {
  return args.appName !== undefined ? args.appName : 'voiceBasket' ;
} ;

var getAppDirectory = function () {
  return apps[getAppName()].buildDirectory ;
} ;

var getAppSourceDirectory = function () {
  return apps[getAppName()].html ;
} ;

var baseFunction = function(_file){

  var sharedFile = 'shared' ;

  var _path = _file.path ;

  if(_path.search(sharedFile) > -1)
    return _path.split("tmpl/")[1] || _path.split("tmpl\\")[1] ;
  else
    return _path.split("voiceBasket/app")[1] || _path.split("voiceBasket\\app")[1] ;
} ;

var getAppTemplateName = function () {
  return {
    'voiceBasket': 'voiceBasket-templates.js'
  }[getAppName()] ;
} ;

var getPort = function () {
  return args.port !== undefined ? args.port : 3030 ;
} ;

var getEnv = function () {
  return args.env !== undefined ? args.env : 'PRODUCTION' ;
};

var getAppjsSource = function () {
  return ['app/index.js'].concat(apps[getAppName()].js) ;
} ;

var getAppStylingSource = function () {
  return apps[getAppName()].css ;
} ;

// Gulp tasks

gulp.task('clean', function () {

  var appDirectory = getAppDirectory() ;
  console.log('CLEANING: ', appDirectory);
  rimraf( appDirectory + '/**/*.*', function () {});

});

gulp.task('externals', function () {

  //console.log(apps[getAppName()].externals);
  var appDirectory = getAppDirectory() ;
  gulp.src(apps[getAppName()].externals)
    .pipe(concat('externals.js'))
    .pipe(gulpif((getEnv() === 'PRODUCTION'),uglifyJs()))
    .pipe(gulp.dest(appDirectory + '/js'));


  gulp.src(apps[getAppName()].externalCss)
    .pipe(concat('externals.css'))
    .pipe(gulpif((getEnv() === 'PRODUCTION'),uglifyCss()))
    .pipe(gulp.dest(appDirectory + '/css'));
});

gulp.task('templates', function () {


  gulp.src(getAppSourceDirectory())
    .pipe(minifyHTML({
      conditionals: true
    }))
    .pipe(
      templateCache(
        {
          module: 'app',
          root: '/',
          base: baseFunction,
          filename: getAppTemplateName()
        })
    )
    .pipe(gulp.dest('app'));

});

gulp.task('app', function () {
  runSequence(
    'templates',
    function () {
      gulp.src(getAppjsSource())
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(gulpif((getEnv() === 'PRODUCTION'),uglifyJs()))
        .on('error', function (e) {
          this.emit('end');
        })
        .pipe(sourcemaps.write({dest: getAppDirectory() + '/js'}))
        .pipe(gulp.dest(getAppDirectory() + '/js'))
    }
  );

    var cssStream = gulp.src(getAppStylingSource())
      .pipe(stylus({
        'include css': true
      }));


    var scssStream = gulp.src(apps[getAppName()].scss)
      .pipe(concat('app.scss'))
      .pipe(sass().on('error', sass.logError));

    merge(scssStream, cssStream)
      .pipe(concat('app.css'))
      .pipe(gulpif((getEnv() === 'PRODUCTION'),uglifyCss()))
      .pipe(gulp.dest(getAppDirectory() + '/css'))
    ; //.pipe(browserSync.reload({stream: true}));

    gulp.src('app/index.html').pipe(gulp.dest(getAppDirectory()));

});

gulp.task('serve', function () {
  var appDirectory = getAppDirectory() ;
  var port = getPort() ;

  gulp.src(appDirectory)
    .pipe(webserver({
      port: port,
      fallback: 'index.html'
    }));
});

gulp.task('build', function () {

  runSequence(
    'clean', 'externals', 'app'
  ) ;

});

gulp.task('watch', ['build'], function () {
  gulp.watch('app/**/*.*', ['app']) ;
});
