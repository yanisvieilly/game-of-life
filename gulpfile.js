var gulp = require('gulp')
, coffee = require("gulp-coffee");

gulp.task('build', function() {
  gulp.src('src/*.coffee')
  .pipe(coffee())
  .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('src/*.coffee', ['build']);
});

gulp.task('default', ['watch']);
