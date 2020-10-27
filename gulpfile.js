const { src, dest, watch, series, parallel } = require("gulp"),
babel = require("gulp-babel"),
browserSync = require('browser-sync').create(),
livereload = require('gulp-livereload');

// Paths
const files = {
	phpPath: 'src/**/*.php'
};

// Tasks for copying a php file
function php() {
    return src(files.phpPath)
        .pipe(dest('public'))
		.pipe(browserSync.stream())
		.pipe(livereload());  
}
// watch task
function watchTask()
{
	livereload.listen();
	browserSync.init({
		server:{
			baseDir: 'public/' }
		});
	watch([files.phpPath], 
        parallel(php)
    ).on('change', browserSync.reload);
}

// Gulp basic task
exports.default = series(
    parallel(php),
);