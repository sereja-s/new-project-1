import del from "del";
import zipPlugin from "gulp-zip";

export const zip = () => {
	del(`./${app.path.rootFolder}.zip`); // удаляем существующий архив (если он существует)
	return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "ZIP",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(zipPlugin(`${app.path.rootFolder}.zip`)) // получаем имя корневой папки проекта (здесь- a-gulp-2022) С этим названием будет создан архив
		.pipe(app.gulp.dest('./')); // архив выгрузится в корень нашей папкии с проектом
}