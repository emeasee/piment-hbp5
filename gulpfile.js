var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    browserSync = require('browser-sync');


gulp.task('js', function () {
   return gulp.src('js/*.js')
      .pipe(plugins.uglify())
      .pipe(plugins.concat('app.js'))
      .pipe(gulp.dest('build'));
});

gulp.task('css', function() {
    return gulp.src('css/app.css')
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('build'));
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

gulp.task('build', ['js', 'css']);
