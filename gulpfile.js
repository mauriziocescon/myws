const {src, dest} = require('gulp');
const gulpConcat = require('gulp-concat');
const gulpSort = require('gulp-sort');

const mfName = process.env.MF_NAME;

exports.default = () => src(`dist/${mfName}/**/*.js`)
  .pipe(gulpSort({
    comparator: (f1, f2) => {
      // order: runtime - polyfills - main
      let n1, n2;

      n1 = `${f1.path.substring(f1.path.lastIndexOf('/') + 1)}`.endsWith('runtime.js') ? 'a' : n1;
      n1 = `${f1.path.substring(f1.path.lastIndexOf('/') + 1)}`.endsWith('polyfills.js') ? 'b' : n1;
      n1 = `${f1.path.substring(f1.path.lastIndexOf('/') + 1)}`.endsWith('main.js') ? 'c' : n1;

      n2 = `${f2.path.substring(f2.path.lastIndexOf('/') + 1)}`.endsWith('runtime.js') ? 'a' : n2;
      n2 = `${f2.path.substring(f2.path.lastIndexOf('/') + 1)}`.endsWith('polyfills.js') ? 'b' : n2;
      n2 = `${f2.path.substring(f2.path.lastIndexOf('/') + 1)}`.endsWith('main.js') ? 'c' : n2;

      return n1.localeCompare(n2);
    }
  }))
  .pipe(gulpConcat('main.js'))
  .pipe(dest(`projects/host/public/elements/${mfName}`));
