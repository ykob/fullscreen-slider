// 設定ファイル
// 対象パスやオプションを指定

const DOMAIN = module.exports.DOMAIN = 'https://ykob.github.io';
const DIR = module.exports.DIR =  {
   // 語尾にスラッシュはつけない
  PATH: '/fullscreen-slider',
  SRC: 'src',
  DEST: 'dst',
  BUILD: 'docs'
};

module.exports.serve = {
  dest: {
    notify: false,
    startPath: `${DIR.PATH}/`,
    ghostMode: false,
    server: {
      baseDir: DIR.DEST,
      index: 'index.html',
      routes: {
        [DIR.PATH]: `${DIR.DEST}${DIR.PATH}/`
      }
    }
  },
  build: {
    notify: false,
    startPath: DIR.PATH,
    ghostMode: false,
    server: {
      baseDir: DIR.BUILD,
      index: 'index.html',
      routes: {
        [DIR.PATH]: `${DIR.BUILD}/`
      }
    }
  }
};

module.exports.scripts = {
  src: [
    `./${DIR.SRC}/**/*.js`,
  ],
  dest: {
    development: `./${DIR.DEST}${DIR.PATH}/js`,
    production: `./${DIR.BUILD}/js`,
  },
  webpack: {
    entry: `./${DIR.SRC}/js/main.js`,
    output: {
      filename: `main.js`
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
        }
      ]
    }
  },
};

module.exports.pug = {
  src: [
    `${DIR.SRC}/**/*.pug`,
    `!${DIR.SRC}/**/_**/*.pug`,
    `!${DIR.SRC}/**/_*.pug`
  ],
  dest: `${DIR.DEST}${DIR.PATH}`,
  opts: {
    pretty: true
  },
  json: `${DIR.SRC}/data.json`,
};

module.exports.sass = {
  src: [
    `${DIR.SRC}/**/*.{sass,scss}`,
    `!${DIR.SRC}/**/_**/*.{sass,scss}`,
    `!${DIR.SRC}/**/_*.{sass,scss}`
  ],
  dest: `${DIR.DEST}${DIR.PATH}/css`,
};

module.exports.replace = {
  html: {
    src: [
      `${DIR.DEST}${DIR.PATH}/**/*.html`
    ],
    dest: `${DIR.BUILD}`,
  }
};

module.exports.cleanCss = {
  src: `${DIR.DEST}${DIR.PATH}/css/main.css`,
  dest: `${DIR.BUILD}/css`,
};

module.exports.copy = {
  dest: {
    src: [
      `${DIR.SRC}/img/**/*.*`,
      `${DIR.SRC}/font/**/*.*`,
      `${DIR.SRC}/json/**/*.*`,
    ],
    dest: `${DIR.DEST}${DIR.PATH}`,
    opts: {
      base: `${DIR.SRC}`
    }
  },
  build: {
    src: [
      `${DIR.DEST}${DIR.PATH}/img/**/*.ico`,
      `${DIR.DEST}${DIR.PATH}/img/**/no_compress/*.*`,
      `${DIR.DEST}${DIR.PATH}/font/**/*.*`,
      `${DIR.DEST}${DIR.PATH}/json/**/*.*`,
    ],
    dest: `${DIR.BUILD}`,
    opts: {
      base: `${DIR.DEST}${DIR.PATH}`
    }
  },
  php: {
    src: [
      `${DIR.SRC}/html/**/*.php`,
    ],
    dest: `${DIR.BUILD}`,
    opts: {
      base: `${DIR.SRC}/html/`
    }
  },
};

module.exports.imagemin = {
  src: [
    `${DIR.DEST}${DIR.PATH}/**/*.{jpg,jpeg,png,gif,svg}`,
    `!${DIR.DEST}${DIR.PATH}/img/**/no_compress/*.*`,
  ],
  dest: `${DIR.BUILD}/img`,
  opts: {
    pngquant: {
      quality: [0.6, 0.8],
      speed: 1,
    },
    mozjpeg: {
      quality: 80,
      progressive: true,
    },
    svgo: {
      plugins: [
        { removeViewBox: false },
        { cleanupIDs: true },
      ]
    },
  }
};

module.exports.clean = {
  dest: {
    path: [`${DIR.DEST}`]
  },
  build: {
    path: [`${DIR.BUILD}`]
  }
};
