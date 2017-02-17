let gulp = require("gulp");
let ts = require("gulp-typescript");
let tsProject = ts.createProject("./tsconfig.json");
let tslint = require("gulp-tslint");

gulp.task("lint:ts", function() {
    return gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
});

gulp.task("compile:ts", ["lint:ts"], function () {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("dist"));
});

gulp.task("test:js", ["compile:ts"], function () {

});

gulp.task("default", ["compile:ts"], function () {

});

