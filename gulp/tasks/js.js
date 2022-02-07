// Задача: работа с js-файлами

// подключим специальный модуль webpack
import webpack from "webpack-stream"

// создадим и экспортируем (для использования в других файлах) функцию js для выполнения задачи:
export const js = () => {
	return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev }) //true нужно только в режиме разработчика, а в режиме продакшн он не нужен (на видео 1:34:13)
		// пропишем действиея:
		// обработка ошибок и вывод сообщений(подсказок):
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "JS",
				message: "Error: <%= error.message %>"
			})
		))
		// настройки webpack:
		.pipe(webpack(
			{
				//mode: 'development', // режим разработчика
				mode: app.isBuild ? 'production' : 'development',//Если мы в режиме продакшн(isBuild) указываем production, если нет то указываем development(Режим разработчика)(на видео 1:34:25)
				output: {
					filename: 'app.min.js',
				}
			}
		))
		// перенос js-файлов по указанному пути с помощъю метода dest() после сжатия:
		.pipe(app.gulp.dest(app.path.build.js))
		// автоматическое обновление браузера после переноса файлов в папку с результатом:
		.pipe(app.plugins.browsersync.stream());
}