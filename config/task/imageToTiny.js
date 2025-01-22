import tinypng from "gulp-tinypng-compress";

export const imageToTiny = () => {
  return app.gulp
    .src(app.direction.src.imageToTiny, { encoding: false })
    .pipe(
      app.plugin.plumber(
        app.plugin.notify.onError({
          title: "IMAGES",
          message: "Error: <%= error.message %>",
        }),
      ),
    )
    .pipe(app.plugin.newer(app.direction.build.image))
    .pipe(
      app.plugin.ifCustom(
        app.isBuild,
        tinypng({
          key: "LGLJp7yYxtx9Z3BqQ4N64mNP8k0b4C0p",
          // sigFile: 'images/.tinypng-sigs',
          log: true,
        }),
      ),
    )
    .pipe(app.gulp.dest(app.direction.build.image))
    .pipe(app.plugin.browsersync.stream());
};
