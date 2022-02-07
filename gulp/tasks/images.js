// Задача: работа с изображениями:

// сжатие, оптимизация, автоматическое создание формата webp:
import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

// создадим и экспортируем (для использования в других файлах) функцию images для выполнения задачи:
export const images = () => {
	// получаем доступ к папке с исходниками:
	return app.gulp.src(app.path.src.images)
		// пропишем действия:
		// обработка ошибок и вывод сообщений(подсказок):
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "IMAGES",
				message: "Error: <%= error.message %>"
			})
		))
		// вызываем плагин gulp-newer и проверяем картинки (на обновление) в папке с результатом (передаём ему путь к ней):
		.pipe(app.plugins.newer(app.path.build.images))
		// создадим изображение webp (вызываем плагин webp):
		/* .pipe(webp())
		// перенос изображений по указанному пути с помощъю метода dest() в папку с результатом:
		.pipe(app.gulp.dest(app.path.build.images))
		// опять получаем доступ к папке с исходниками:
		.pipe(app.gulp.src(app.path.src.images))
		// опять вызываем плагин gulp-newer и проверяем картинки (на обновление) в папке с результатом (передаём ему путь к ней):
		.pipe(app.plugins.newer(app.path.build.images))
		// вызываем плагин (сжатие картинок):
		.pipe(imagemin(
			{
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3, // степень сжатия изображения
			}
		)) */
		//Переделали всё по видео(1:33:09)
		.pipe(
			app.plugins.if(//Добавил(на видео 1:33:09) плагин gulp-if
				app.isBuild,//Добавил(на видео 1:33:09) продакшн
				webp()
			)
		)
		.pipe(
			app.plugins.if(//Добавил(на видео 1:33:09) плагин gulp-if
				app.isBuild,//Добавил(на видео 1:33:09) продакшн
				(app.gulp.dest(app.path.build.images))//После того как изображения созданы, мы их выгружаем в папку с результатами(build)
			)
		)
		.pipe(
			app.plugins.if(//Добавил(на видео 1:33:09) плагин gulp-if
				app.isBuild,//Добавил(на видео 1:33:09) продакшн      
				(app.gulp.src(app.path.src.images))//Снова получаем доступ к изображениям папки исходников(src)
			)
		)
		.pipe(
			app.plugins.if(//Добавил(на видео 1:33:09) плагин gulp-if
				app.isBuild,//Добавил(на видео 1:33:09) продакшн
				(app.plugins.newer(app.path.build.images))//Снова проверяем изображения на обновления(newer)
			)
		)
		.pipe(
			app.plugins.if(//Добавил(на видео 1:33:09) плагин gulp-if
				app.isBuild,//Добавил(на видео 1:33:09) продакшн
				imagemin({//Создали задачу которая эти картинки будет сжимать
					progressive: true,
					svgoPlugins: [{ removeViewBox: false }],
					interlaced: true,
					optimizationLevel: 3 //0 to 7 //Указали на сколько сильно нам нужно сжимать изображения
				})
			)
		)
		// перенос изображений по указанному пути с помощъю метода dest() после сжатия в папку с результатом:
		.pipe(app.gulp.dest(app.path.build.images))
		// получаем доступ к папке с исходниками (изображениям в формате svg):
		.pipe(app.gulp.src(app.path.src.svg))
		// перенос изображений в формате svg по указанному пути с помощъю метода dest() в папку с результатом:
		.pipe(app.gulp.dest(app.path.build.images))
		// автоматическое обновление браузера после переноса файлов в папку с результатом:
		.pipe(app.plugins.browsersync.stream());
}