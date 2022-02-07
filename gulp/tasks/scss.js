// Задача: преобразование файлов scss в css

// подключим плагин sass (препроцессор):
import dartSass from "sass";
// подключим плагин gulp-sass (подключает препроцессор):
import gulpSass from "gulp-sass";
// подключим плагин gulp-sass (меняет имя файла):
import rename from "gulp-rename";

import cleanCss from "gulp-clean-css"; // cсжатие css-файла
import webpcss from "gulp-webpcss"; // вывод webp-изображений
import autoprefixer from "gulp-autoprefixer"; // добавление вендорных префиксов
import groupCssMediaQueries from "gulp-group-css-media-queries"; // группировка медиа-запросов

const sass = gulpSass(dartSass)

// создадим и экспортируем (для использования в других файлах) функцию scss для выполнения задачи:
export const scss = () => {
	return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev }) //true нужно только в режиме разработчика, а в режиме продакшн он не нужен (на видео 1:33:53)
		// пропишем действиея:
		// обработка ошибок и вывод сообщений(подсказок):
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SCSS",
				message: "Error: <%= error.message %>"
			})
		))
		// поиск и замена (здесь- исправление путей к картинкам в результате):
		.pipe(app.plugins.replace(/@img\//g, '../img/'))
		//вызываем компилятор:
		.pipe(sass({
			outputStyle: 'expanded' // изначальный стиль готового файла
		}))
		/* .pipe(groupCssMediaQueries())
		.pipe(webpcss(
			{
				// webp-изображения подключаются только если браузер их потдерживает:
				webpClass: ".webp",
				noWebpClass: ".no-webp"
			}
		))
		.pipe(autoprefixer(
			{
				grid: true,
				overrideBrowserslist: ["last 3 versions"],
				cascade: true
			}
		))
		// перенос файлов по указанному пути с помощъю метода dest() до того как css-файл будет сжат:
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(cleanCss()) */

		// Прокачаем наши стили, добавим 4шт. плагинов.
		.pipe(
			app.plugins.if(//Добавил(на видео 1:33:32) плагин gulp-if
				app.isBuild,//Добавил(на видео 1:33:32) продакшн
				groupCssMediaQueries()//первый
			)
		)
		//Поменял местами подключени autoprefixer с подключением webpcss
		.pipe(
			app.plugins.if(//Добавил(на видео 1:33:32) плагин gulp-if
				app.isBuild,//Добавил(на видео 1:33:32) продакшн
				autoprefixer({//третий
					grid: true,
					ovverrideBrowserslist: ["last 3 versions"],//Здесь указали количество версий браузера
					cascade: true
				})
			)
		)
		.pipe(
			app.plugins.if(//Добавил(на видео 1:33:32) плагин gulp-if
				app.isBuild,//Добавил(на видео 1:33:32) продакшн
				webpcss(//второй
					{
						webpClass: ".webp",
						noWebpClass: ".no-webp"
					}
				)
			)
		)
		//Раскоментировать если нужен не сжатый дубль файла стилей. Если оставим их обоих, то мы получим два файла. Первый style.css(не сжатый), а второй style.min.css  
		.pipe(app.gulp.dest(app.path.build.css))//1.
		.pipe(
			app.plugins.if(//Добавил(на видео 1:33:32) плагин gulp-if
				app.isBuild,//Добавил(на видео 1:33:32) продакшн
				cleanCss()//2.Сжатие пишем последним(четвёртым)
			)
		)
		//меняем имя файла:
		.pipe(rename({
			extname: ".min.css"
		}))
		// перенос css-файлов по указанному пути с помощъю метода dest() после сжатия:
		.pipe(app.gulp.dest(app.path.build.css))
		// автоматическое обновление браузера после переноса файлов в папку с результатом:
		.pipe(app.plugins.browsersync.stream());
}