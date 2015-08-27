var gulp = require('gulp')
var plumber = require('gulp-plumber');
var coffee = require("gulp-coffee");

gulp.task('build', function() {
  gulp.src('src/*.coffee')
    .pipe(plumber())
    .pipe(coffee())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('src/*.coffee', ['build']);
});

gulp.task('default', ['watch']);
