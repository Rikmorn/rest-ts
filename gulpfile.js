'use strict';

const path        = require('path');
const ts          = require('gulp-typescript');
const gulp        = require('gulp');
const sourcemaps  = require('gulp-sourcemaps');
const typedoc     = require('gulp-typedoc');
const runSequence = require('run-sequence');
const del         = require('del');
const merge       = require('merge2');

const targets = {
  dist   : path.join(__dirname, "dist"),
  typings: path.join(__dirname, "typings")
};

gulp.task('clean', () => {
  del.sync(targets.dist);
  del.sync(targets.typings);
});

gulp.task('build.js.prod', () => {
  let tsProject = ts.createProject(path.join(targets.dist, '..', 'tsconfig', 'release.json'), {
    typescript: require('typescript')
  });

  let tsResult = tsProject.src()
    .pipe(tsProject());

  return merge([
    //Write definitions
    tsResult.dts.pipe(gulp.dest(targets.typings)),
    //Write compiled js
    tsResult.js.pipe(gulp.dest(targets.dist))]);
});

gulp.task('build.js', () => {
  let tsProject = ts.createProject(path.join(targets.dist, '..', 'tsconfig', 'debug.json'), {
    typescript: require('typescript')
  });

  let tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  return merge([
    //Write definitions
    tsResult.dts.pipe(gulp.dest(targets.typings)),
    //Write compiled js
    tsResult.js.pipe(sourcemaps.write(
      ".",
      {
        includeContent: false,
        sourceRoot    : "../dist"
      })).pipe(gulp.dest(targets.dist))]);
});

gulp.task('docs', () => {
  return gulp
    .src(["./src/**/*.ts"])
    .pipe(typedoc(
      {
        // TypeScript options (see typescript docs)
        module                : "commonjs",
        target                : "es6",
        includeDeclarations   : true,
        experimentalDecorators: true,

        // Output options (see typedoc docs)
        out: "./docs",

        // TypeDoc options (see typedoc docs)
        name                : "rest-ts",
        ignoreCompilerErrors: false,
        excludeExternals    : true,
        version             : true,
      }));
});

gulp.task('build', (done) => {
  let build = (process.env.NODE_ENV === 'production') ? 'build.js.prod' : 'build.js';
  return runSequence(
    'clean',
    build,
    done);
});
