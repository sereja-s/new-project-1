// Подключаем основные модули:
// импорируем gulp из пакета gulp:
import gulp from "gulp";
// импортируем константу path из файла path.js:
import { path } from "./gulp/config/path.js";
// импортруем общие плагины:
import { plugins } from "./gulp/config/plugins.js";

// Передаём значения в глобальную переменную для хранения общих сущностей:
global.app = {
	isBuild: process.argv.includes('--build'),//Режим продакшн
	isDev: !process.argv.includes('--build'),//Режим разработчика
	path: path,
	gulp: gulp,
	plugins: plugins
}


// импорт задач:
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";



// функция, которая будет наблюдать за изменениями в файлах папки, путь к которой прописан в path.js:
function watcher() {
	// обратимся к соответствующей функции в gulp, в которую передадим путь к файлам за которыми нужно следить и действие(задачу) которое необходимо выполнить:
	gulp.watch(path.watch.files, copy);
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.images, images);
}

export { svgSprive } // для отдельного запуска задачи

//Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);


// Пропишем основные задачи которые должны выполняться параллельно (обратимся к gulp и его функции parallel()):
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));


// построение сценариев выполнения задач:
//обратимся к gulp и его методу для последовательного выполнения задач series() и укажем последовательно задачи(функции):
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);//Продакшн
const deployZIP = gulp.series(reset, mainTasks, zip);


//Экспорт сценариев (что бы их было видно из вне)
export { dev }
export { build }
export { deployZIP }

// выполнение сценария по умолчанию:
gulp.task('default', dev);