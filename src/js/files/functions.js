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

// ПОПАП

export function initPopups() {

	const popupLinks = document.querySelectorAll('.popup-link'); // получаем все кнопки, которые открывают окно
	const body = document.querySelector('body'); // получаем body - для блокировки скролла
	// получаем все объкты с классом lock-padding (этот класс добвлется нами для фиксированных объектов, чтобы они при сокрытии скролла (в момент открытия попапа) не смещались)
	const lockPadding = document.querySelectorAll('.lock-padding');

	/* console.log(popupLinks)
	console.log(body)
	console.log(lockPadding) */

	let unlock = true; // чтобы не было двойных нажатий

	const timeout = 800; // время анимации (равен тому что прописан для элемента в css (здесь- transition: all 0.8s ease 0s;))	

	// Получаем все ссылки открытия окна
	if (popupLinks.length > 0) {
		for (let index = 0; index < popupLinks.length; index++) {
			const popupLink = popupLinks[index];
			popupLink.addEventListener('click', function (e) {
				const popupName = popupLink.getAttribute('href').replace('#', ''); // получаем чистое имя ID
				const curentPopup = document.getElementById(popupName); // получаем сам ID
				popupOpen(curentPopup); // отправляем полученный элемент в функцию popupOpen
				e.preventDefault(); // сброс стандратного поведения (запрет перезагружать страницу (дальнейшей работы ссылки))
			});
		}
	}


	// Объекты которые будут Окно закрывать
	const popupCloseIcon = document.querySelectorAll('.close-popup');
	if (popupCloseIcon.length > 0) {
		for (let index = 0; index < popupCloseIcon.length; index++) {
			// получаем конкретный объект:
			const el = popupCloseIcon[index];
			// вешаем на него событие click:
			el.addEventListener('click', function (e) {
				// при этом событии отправляем в функцию popupClose() объект, который является близжайшим родителем (с классом popup) нажатой ссылки Его функция popupClose() и будет закрывать
				popupClose(el.closest('.popup'));
				e.preventDefault(); // запрет дальнейшей работы ссылки
			})
		}
	}

	// Функция открытия попапа:
	// в параметры мы передаём готовый объект по имени (по идентификатору)
	function popupOpen(curentPopup) {
		// проеряем есть ли такой объект и открыта ли переменная unlock (в начале мы указали (объявили): let unlock = true;)
		if (curentPopup && unlock) {
			const popupActive = document.querySelector('.popup.open'); // получаем открытый попап (объект с классом popup у которого добавлен класс open)
			if (popupActive) { // если он существует
				popupClose(popupActive, false); // тогда закрыть его
			} else { // если такого нет 
				bodyLock(); // тогда блокируется скролл
			}
			curentPopup.classList.add('open'); // открываем попап 
			// открывшемуся попапу вешаем событие при click
			curentPopup.addEventListener('click', function (e) {
				// если у нажатого объекта нет в родителях popup__content (это-тёмная область вокруг модального окна(попапа))
				if (!e.target.closest('.popup__content')) {
					// тогда мы popup закрываем кликом на тёмную область
					popupClose(e.target.closest('.popup'));
				}
			});
		}
	}

	// Функция, закрывающая попап

	// в параметры передаём активный обект (открытый попап) и значение, указывающее нужно ли блокировать скролл (если открывается попап из попапа, то уже не нужно)
	function popupClose(popupActive, doUnlock = true) {
		if (unlock) {
			popupActive.classList.remove('open');
			// при закрытии одного попапа (в момент открытия другого) скролл будет оставаться заблокирован (скрыт)
			if (doUnlock) {
				bodyUnlock();
			}
		}
	}

	// Функция скрывающая скролл

	function bodyLock() {
		// вычисляем разницу между шириной вьюпорта (всего окна) и шириной объкта, который находится внутри него (чтобы получить ширину скролла, который мы будем скрывать)
		// Это нужно чтобы не происходило смещения контента во время когда попап закрывается и скролл появляется снова
		const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

		// проверка: есть ли объекты с классом lock-padding
		if (lockPadding.length > 0) {
			// в цикле бегаем по всем объектам с классом lock-padding (получили в начале)
			for (let index = 0; index < lockPadding.length; index++) {
				// каждому полученному объекту с классом lock-padding
				const el = lockPadding[index];
				// присваиваем расчётное значение, равное ширине скролла (в виде: padding-right) элементам с классом lock-padding
				el.style.paddingRight = lockPaddingValue;
			}
		}

		// присваиваем расчётное значение также самому body
		body.style.paddingRight = lockPaddingValue;
		// добавляем body класс lock
		body.classList.add('lock');

		// здесь блокируем (закрываем) переменную unlock (чтобы не было повторного нажатия на ссылку на попап, в момент открытия попапа)
		unlock = false;
		// снова возвращаем переменной значение unlock = true, после того как пройдёт время (анимации) указанное нами в начале в перемненной const timeout = 800;
		setTimeout(function () {
			unlock = true;
		}, timeout);
	}

	// функция показывающая скролл, только после того как закончится анимация (что бы не дёргался попап в момент закрытия)

	function bodyUnlock() {
		setTimeout(function () {
			if (lockPadding.length > 0) {
				for (let index = 0; index < lockPadding.length; index++) {
					const el = lockPadding[index];
					el.style.paddingRight = '0px'; // убираем padding-right у элементов
				}
			}
			body.style.paddingRight = '0px'; // убираем padding-right у body
			body.classList.remove('lock'); // убираем класс lock у body (по классу lock убирается скролл) после определённого timeout
		}, timeout);

		unlock = false; // отключаем переменную (чтобы не было повторных нажатий)
		setTimeout(function () {
			unlock = true; // после timeout снова включаем
		}, timeout);
	}

	// Закрытие окна попап при нажатии клавиши Esc:

	// слушаем нажатие клавиш по всему документу
	document.addEventListener('keydown', function (e) {
		// проверяем какая клавиша нажата и при нажатии клавиши имеющей код 27 (Esc)
		if (e.which === 27) {
			// попап закрывается (получаем открытый объект и отправляем его в функцию popupClose() )
			const popupActive = document.querySelector('.popup.open');
			popupClose(popupActive);
		}
	});

	//Функции полифилы (подгоняют определённые параметры (свойства: closest и matches) под старые браузеры):

	(function () {
		// проверяем поддержку
		if (!Element.prototype.closest) {
			// реализуем
			Element.prototype.closest = function (css) {
				var node = this;
				while (node) {
					if (node.matches(css)) return node;
					else node = node.parentElement;
				}
				return null;
			};
		}
	})();
	(function () {
		// проверяем поддержку
		if (!Element.prototype.matches) {
			// определяем свойство
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.msMatchesSelector;
		}
	})();

	/* console.log("hello") */

}