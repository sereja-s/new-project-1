// задача: копирование файлов html

// подключим плагин gulp-file-include:
import fileInclude from "gulp-file-include";
// подключим плагин gulp-webp-html-nosvg:
import webpHtmlNosvg from "gulp-webp-html-nosvg";
// подключим плагин gulp-version-number:
import versionNumber from "gulp-version-number";



// создадим и экспортируем (для использования в других файлах) функцию copy для выполнения задачи:
export const html = () => {
	// функция возвращает: обращаемся к глобальной переменной app, там ищем gulp, у которого есть метод src(), который получает доступ к файлам и папкам по указанному пути (пути у нас уже настроены в path.js):
	return app.gulp.src(app.path.src.html)

		// пропишем действия:
		// обработка ошибок и вывод сообщений(подсказок):
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "HTML",
				message: "Error: <%= error.message %>"
			})
		))
		// сборка разделённых файлов в один:
		.pipe(fileInclude())
		// поиск и замена (здесь- исправление путей к картинкам в результате):
		.pipe(app.plugins.replace(/@img\//g, 'img/'))
		// конвертруем картинки в формат webp (кроме svg):
		/* .pipe(webpHtmlNosvg())
		// не даёт кешировать файлы:
		.pipe(
			versionNumber({
				'value': '%DT%', //добавлет к адресу файлов текущие дату и время
				'append': {
					'key': '_v',
					'cover': 0,
					'to': [
						'css',
						'js',
					]
				},
				'output': {
					'file': 'gulp/version.json' // будет создаваться файл version.json в папке gulp (здесь- будет храниться ключ)
				}
			})
		) */
		.pipe(
			app.plugins.if(//Добавил(на видео 1:32:28) плагин gulp-if
				app.isBuild,//Добавил(на видео 1:32:28) продакшн
				webpHtmlNosvg()
			)
		)
		.pipe(
			app.plugins.if(//Добавил(на видео 1:32:28) плагин gulp-if
				app.isBuild,//Добавил(на видео 1:32:28) продакшн
				versionNumber({
					'value': '%DT%',
					'append': {
						'key': '_v',
						'cover': 0,
						'to': [
							'css',
							'js',
						]
					},
					'output': {
						'file': 'gulp/version.json'
					}
				})
			)
		)
		// перенос файлов по указанному пути с помощъю метода dest():
		.pipe(app.gulp.dest(app.path.build.html))
		// автоматическое обновление браузера после переноса файлов в папку с результатом:
		.pipe(app.plugins.browsersync.stream());
}