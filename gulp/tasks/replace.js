const gulp = require('gulp');

const $ = require('../plugins');
const DIR = require('../conf').DIR;
const conf = require('../conf').replace;

gulp.task('replaceHtml', () => {
  const regJs = new RegExp(`(src="${DIR.PATH}\/js\/)([a-z0-9_\.\-]*)(\.js")`);
  const regCss = new RegExp(`(href="${DIR.PATH}\/css\/)([a-z0-9_\.\-]*)(\.css")`);
  return gulp.src(conf.html.src)
    .pipe($.replace(regJs, '$1$2.min$3'))
    .pipe($.replace(regCss, '$1$2.min$3'))
    .pipe(gulp.dest(conf.html.dest));
});
