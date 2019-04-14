const gulp = require('gulp');

const $ = require('../plugins');
const conf = require('../conf').cleanCss;

gulp.task('cleanCss', () => {
  return gulp.src(conf.src)
    .pipe($.cleanCss())
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest(conf.dest));
});
