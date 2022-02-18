// zlatmax-1-(2:10:00)
// Код попадает в итоговый файл, только когда вызвана функция: например allFunctions.isWebp();
// или
// импортрован весь файл: например import "files/spoiler.js";

// Подключение основного файла стилей:
//import "../scss/style.scss";

// Плагины =====================================================================================================================

// Динамический адаптив:
import "./files/dynamic_adapt.js";

// Спойлер 
import "./files/spoiler.js"

// Форматирование чисел:
import "./libs/wNumb.min.js";

// Основные модули ===============================================================================================================
// Импортируем все функции из файла functions.js по указанному адресу:
/* import * as allFunctions from "./modules/functions.js"; */
import * as allFunctions from "./files/functions.js";

// Обращаемся к конкретной функции импортрованного файла functions.js (здесь: под названием allFunctions)
// проверка потдержки браузером формата изображений webp и добавление класса webp или no-webp для HTML:
allFunctions.isWebp();

// МЕНЮ-БУРГЕР и его анимация:
allFunctions.menuInit();

// ПОПАП
allFunctions.initPopups();






// подключение Swiper-слайдера:
import Swiper, { Navigation, Pagination } from 'swiper';

// инициализация Swiper:
const swiper = new Swiper();

//================================================================================================================================

// Свои скрипты 
import "./files/script.js"