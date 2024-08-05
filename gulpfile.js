const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const { exec } = require('child_process');
const path = require('path'); 

function styleSite() {
    return src('./FrontEndDev/styles/**/*.scss')
        .pipe(sass({ includePaths: './FrontEndDev/styles' }).on('error', sass.logError))
        .pipe(dest('./wwwroot/css/compiledscss'));
}

function compileReact(cb) {
    const webpackConfigPath = path.resolve(__dirname, 'FrontEndDev/reactapp/webpack.config.js');
    exec(`npx webpack --config ${webpackConfigPath}`, { cwd: path.resolve(__dirname, 'FrontEndDev/reactapp') }, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error: ${err}`);
            return cb(err);
        }
        console.log(stdout);
        console.error(stderr);
        cb();
    });
}

function watchFiles() {
    watch('./FrontEndDev/styles/**/*.scss', series(styleSite));
    watch('./FrontEndDev/reactapp/components/**/*.js', series(compileReact)); 
}

exports.watch = parallel(styleSite, compileReact, watchFiles);