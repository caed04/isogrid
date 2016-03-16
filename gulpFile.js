var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sourcemaps = require("gulp-sourcemaps"),
    less = require('gulp-less'),
    browserSync = require('browser-sync'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    babel = require('gulp-babel'),
    nano = require('gulp-cssnano');


var SCRIPTS_TO_COMPILE = ["isogrid"];
var siteTasks = ['less', 'watch'];

var url = 'local.version10.ca/isogrid/';
var basePath = '';


/**********************************************************************************************
 TASKS
 ***********************************************************************************************/
SCRIPTS_TO_COMPILE.forEach(function(scriptName, index, array){
    gulp.task('script-'+scriptName, function(){
        siteTasks.push('script-'+scriptName);

        return gulp.src('./src/js/'+scriptName+'.js')
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(concat(scriptName+".min.js"))
            .pipe(sourcemaps.write("."))
            .pipe(uglify({ preserveComments:'license' }).on('error', gutil.log))
            .pipe(gulp.dest('./dist'))
            .pipe(browserSync.reload({stream:true}));
    });
});

gulp.task('less', function(){
	return gulp.src('./src/styles/less/styles.less')
		.pipe(plumber(function (error) {
			// Output an error message
			gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
			// emit the end event, to properly end the task
			this.emit('end');
		}))
        .pipe(concat('styles.min.css'))
		.pipe(less({
	        modifyVars: {
                //path : '~"../../images/build/"' //modification du path des images en prod
            }
		}))
        .pipe(nano({zindex:false}))
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync', function() {
    browserSync.init([
        basePath + '/dist/css/**/*.css',
        basePath + '/dist/js/**/*.js'
    ], {
        proxy: url
    });
});

gulp.task('watch',['browser-sync'], function (){
    SCRIPTS_TO_COMPILE.forEach(function(scriptName, index, array){
        gulp.watch('src/js/'+scriptName+'.js', ['script-'+scriptName]);
    });

    gulp.watch('src/styles/less/**/*.less', ['less']);
});



/**********************************************************************************************
 CONFIGS
 ***********************************************************************************************/
// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', siteTasks);