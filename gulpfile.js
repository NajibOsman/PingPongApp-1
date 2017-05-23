var gulp = require('gulp')

var concat = require('gulp-concat')

var uglify = require('gulp-uglify')

var lib = require('bower-files')();

gulp.task('bowerJS', function () {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});
