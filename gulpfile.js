var gulp = require('gulp')

var concat = require('gulp-concat')

var uglify = require('gulp-uglify')

var browserSync = require('browser-sync').create();

// var lib = require('bower-files')();

//find bootstrap files
var lib = require('bower-files')({
  "overrides":{
    "bootstrap" : {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});

//Using Bower Packages in the Gulpfile
gulp.task('bowerJS', function () {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

//Task to run css files via gulp
gulp.task('bowerCSS', function (){
	return gulp.src(lib.ext('css').files)
		.pipe(concat('vendor.css'))

		.pipe(gulp.dest('./build/css'));
});


//Finally, let's combine both these 2 Bower tasks into one, since they can run in parallel. Let's add this task to the gulpfile after our two Bower tasks:

gulp.task('bower', ['bowerJS', 'bowerCSS']);


//clean

gulp.task('build', ['clean'], function(){
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
  gulp.start('bower');
});



//We have created a variable, browserSync, and set it equal to the create function, which is the part of the browser-sync package we will use to create our server. Now, make a task to start that server.

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
});
