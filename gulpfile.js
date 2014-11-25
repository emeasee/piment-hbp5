var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    browserSync = require('browser-sync'),
    del = require('del');


gulp.task('clean', function(cb){
    del([
        'build/**/*'
    ], cb);
});

gulp.task('usemin', function () {
    return gulp.src('*.html')
        .pipe(plugins.usemin({
            css: [plugins.autoprefixer({browsers:['last 2 versions'], cascade: false}), plugins.minifyCss(), 'concat'],
            //html: [plugins.minifyHtml({empty: true})],
            js: [plugins.stripDebug(), plugins.uglify(), plugins.rev(), 'concat']
        }))
        .pipe(gulp.dest('build/'));
});

gulp.task('browser-sync', function () {
   var files = [
      '**/*.html',
      'css/**/*.css',
      'imgs/**/*.png',
      'js/**/*.js'
   ];

   browserSync.init(files, {
      server: {
         baseDir: './'
      }
   });
});
// [todo] - Add a deploy to gh-pages option for the short term. To serve before cloud setup.
gulp.task('build', ['clean'], function(){
    gulp.start('usemin');
});
