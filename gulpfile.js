var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var pug = require('gulp-pug');


var config = {
	src: 'src/',
	dest: 'build/',
	css: {
		src: 'precss/**/*.scss',
		dest: 'css'
	},
	html: {
		src: '*.pug',
	}
}

gulp.task('svgo', function() {

    gulp.src('svg/*')
        .pipe(svgo())
        .pipe(gulp.dest('svg/opt/'));
});

gulp.task('build', function() {

  return gulp.src(config.src + config.css.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.dest + config.css.dest))

		.pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
		.pipe(gulp.dest(config.dest + config.css.dest))

		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('copyHtml', function() {

  return gulp.src(config.src + config.html.src)
     .pipe(pug({
       pretty: true
     }))
  	.pipe(gulp.dest(config.dest))
		.pipe(browserSync.reload({
			stream: true
		}));
});


gulp.task('watch', ['browserSync'], function() {
	gulp.watch(config.src + config.css.src, ['build']);
	gulp.watch(config.src + config.html.src, ['copyHtml']);
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: './build'
		}
	});
});
