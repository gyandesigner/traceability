import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
import { deleteAsync } from 'del';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const sass = gulpSass(dartSass);

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const bs = browserSync.create();

// File paths
const paths = {
  styles: {
    src: join(__dirname, 'public/assets/css/**/*.css'),
    dest: join(__dirname, 'build/public/assets/css')
  },
  scripts: {
    src: join(__dirname, 'public/assets/js/**/*.js'),
    dest: join(__dirname, 'build/public/assets/js')
  },
  images: {
    src: join(__dirname, 'public/assets/img/**/*'),
    dest: join(__dirname, 'build/public/assets/img')
  },
  fonts: {
    src: join(__dirname, 'public/assets/fonts/**/*'),
    dest: join(__dirname, 'build/public/assets/fonts')
  },
  views: {
    src: join(__dirname, 'views/**/*.ejs'),
    dest: join(__dirname, 'build/views')
  },
  server: {
    src: [
      join(__dirname, 'routes/**/*.js'),
      join(__dirname, 'controllers/**/*.js'),
      join(__dirname, 'models/**/*.js'),
      join(__dirname, 'middleware/**/*.js'),
      join(__dirname, 'config/**/*.js'),
      join(__dirname, 'helper/**/*.js')
    ],
    dest: join(__dirname, 'build')
  },
  app: {
    src: join(__dirname, 'app.js'),
    dest: join(__dirname, 'build')
  }
};

// Clean build folder
async function clean() {
  await deleteAsync([join(__dirname, 'build')]);
}

// Process CSS files
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    // .pipe(rename({ suffix: '.min' }))
    // .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(bs.stream());
}

// Process JavaScript files
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    // .pipe(rename({ suffix: '.min' }))
    // .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(bs.stream());
}

// Optimize images
function images() {
  return gulp.src(paths.images.src)
    // .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
}

// Copy fonts
function fonts() {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
}

// Copy views
function views() {
  return gulp.src(paths.views.src)
    .pipe(gulp.dest(paths.views.dest));
}

// Copy server files
function server() {
  return gulp.src(paths.server.src, { base: __dirname })
    .pipe(gulp.dest(paths.server.dest));
}

// Copy app.js
function app() {
  return gulp.src(paths.app.src)
    .pipe(rename('app.js'))
    .pipe(gulp.dest(paths.app.dest));
}

// Copy environment file
function env() {
  return gulp.src(join(__dirname, '.env'))
    .pipe(gulp.dest(join(__dirname, 'build')));
}

// Define complex tasks
const build = gulp.series(clean, gulp.parallel(styles, scripts, images, fonts, views, server, app, env));


// Export tasks
export { clean, styles, scripts, images, fonts, views, server, app, env, build };
