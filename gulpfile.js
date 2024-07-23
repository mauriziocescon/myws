const {src, dest} = require('gulp');
const gulpConcat = require('gulp-concat');
const gulpOrder = require('gulp-order');

const mfName = process.env.MF_NAME;

exports.default = () => src(`dist/${mfName}/**/*.js`)
  .pipe(gulpOrder([
    `runtime.js`,
    `polyfills.js`,
    `main.js`,
  ]))
  .pipe(gulpConcat('main.js'))
  .pipe(dest(`projects/host/public/elements/${mfName}`));
