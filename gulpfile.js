const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function styleSite() {
    return src('./FrontEndDev/styles/**/*.scss')
        .pipe(sass({ includePaths: './FrontEndDev/styles' }).on('error', sass.logError))
        .pipe(dest('./wwwroot/css/compiledscss'));
}

function watchFiles() {
    watch('./FrontEndDev/styles/**/*.scss', series(styleSite));
}

exports.watch = parallel(styleSite, watchFiles);