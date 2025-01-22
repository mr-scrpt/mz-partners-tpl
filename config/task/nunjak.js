import fileInclude from "gulp-file-include";
// import webpHtmlNosvg from 'gulp-webp-html-nosvg'
import versionNumber from "gulp-version-number";
import nunjucksRender from "gulp-nunjucks-render";
import gulpData from "gulp-data";
import htmlmin from "gulp-htmlmin";

export const nunjak = () => {
  return (
    app.gulp
      .src(app.direction.src.nunjak)
      .pipe(
        app.plugin.plumber(
          app.plugin.notify.onError({
            title: "NUNJACKS",
            message: "Error: <%= error.message %>",
          }),
        ),
      )
      .pipe(fileInclude())

      .pipe(gulpData(() => app.data))
      .pipe(
        nunjucksRender({
          path: ["src/view"],
        }),
      )
      // .pipe(app.plugin.replace(/@img\//g, 'img/'))
      .pipe(
        app.plugin.ifCustom(
          app.isBuild,
          app.plugin.replace(/\app.css/gm, "app.min.css"),
        ),
      )
      // .pipe(app.plugin.ifCustom(app.isBuild, webpHtmlNosvg()))
      .pipe(
        app.plugin.ifCustom(
          app.isBuild,
          htmlmin({
            collapseWhitespace: true,
            removeComments: true,
          }),
        ),
      )
      .pipe(
        app.plugin.ifCustom(
          app.isBuild,
          versionNumber({
            value: "%DT%",
            append: {
              key: "_v",
              cover: 0,
              to: ["css", "js"],
            },
            output: {
              file: "config/version.json",
            },
          }),
        ),
      )
      .pipe(app.gulp.dest(app.direction.build.nunjak))
      .pipe(app.plugin.browsersync.stream())
  );
};
