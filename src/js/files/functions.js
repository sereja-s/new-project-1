// проверка потдержки браузером формата изображений webp и добавление класса webp или no-webp для HTML:
export function isWebp() {
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {
		/* let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className); */
		if (support == true) {
			document.querySelector('body').classList.add('webp');
		} else {
			document.querySelector('body').classList.add('no-webp');
		}
	});
}
//=================================================================================================================================

// МЕНЮ-БУРГЕР и его анимация (в шапке сайта):
export function menuInit() {
	/* 1-получим объект (иконку меню-бургер) Будем искать этот класс: */
	const iconMenu = document.querySelector('.icon-menu');
	/* 3-найдём и сохраним в константу menuBody объект .menu__body (будет нужно для анимирования появления меню при нажатии на иконке (меню-бургер) */
	const menuBody = document.querySelector('.menu__body');
	/* 2-проверка: есть ли такой обхект(класс) в константе iconMenu: */
	if (iconMenu) {
		/* 4-создаём событие "click" по иконке(меню-бургер): */
		iconMenu.addEventListener("click", function (e) {
			/* 7-запретим скроллить страницу при открытом меню: */
			//обатимся к body и будем добавлять(убирать) технический класс '_lock' при нажатой иконке(меню-бургер):
			//document.body.classList.toggle('_lock');
			/* 5-обращаемся к иконке(меню-бургер) и добавляем(убираем) класс '_active' при нажатии на неё: */
			iconMenu.classList.toggle('_active'); /* чтобы анимнровать иконку(меню-бургер) при нажатии */
			/* 6-обращаемся к объекту .menu__body и добавляем(убираем) класс '_active' при нажатии на неё: */
			menuBody.classList.toggle('_active'); /* чтобы анимировать появление меню при нажати на иконку(меню-бургер) */
		});
	}
}

//==============================================================================================================================