var gulp = require('gulp')
, coffee = require("gulp-coffee");

gulp.task('compile-coffee', function () {
  gulp.src('src/*.coffee')
  .pipe(coffee())
  .pipe(gulp.dest('dist'));
});

gulp.task('default', function() {

});
