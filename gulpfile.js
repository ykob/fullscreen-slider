const gulp = require('gulp');
const requireDir = require('require-dir');

const $ = require('./gulp/plugins');

requireDir('./gulp/tasks');

gulp.task('default', gulp.series(
  'cleanDest',
  gulp.parallel('pug', 'sass', 'scripts', 'copyToDest'),
  gulp.parallel('serve', 'watch'),
));

gulp.task('build', gulp.series(
  'cleanDest',
  gulp.parallel('pug', 'sass', 'copyToDest'),
  'cleanBuild',
  gulp.parallel('replaceHtml', 'cleanCss', 'scripts', 'imagemin'),
  'copyToBuild',
));

gulp.task('buildHtml', gulp.series(
  'pug',
  'replaceHtml',
));

gulp.task('buildCss', gulp.series(
  'sass',
  'cleanCss',
));
