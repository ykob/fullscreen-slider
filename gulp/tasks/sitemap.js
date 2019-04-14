const gulp = require('gulp');

const $ = require('../plugins');
const conf = require('../conf').sitemap;

gulp.task('sitemap', function () {
  return gulp.src(conf.src, {
    read: false
  })
  .pipe($.sitemap(conf.opts))
  .pipe(gulp.dest(conf.dest));
});
