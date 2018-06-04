'use strict';

const path        = require('path');
const gulp        = require('gulp');
const typedoc     = require('gulp-typedoc');
const del         = require('del');

const tsConfig = require('./tsconfig.json');

const targets = {
  dist   : path.join(__dirname, tsConfig.compilerOptions.outDir),
  typings: path.join(__dirname, tsConfig.compilerOptions.declarationDir)
};

gulp.task('clean', () => {
  del.sync(targets.dist);
  del.sync(targets.typings);
});

// Need to find a more solid doc generator
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

