// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
import { isMobile } from "./functions.js";
// import { formsModules } from "./forms/forms.js";

// Вешаем событие при клике
document.addEventListener("click", documentActions);

const menuBlock = document.querySelectorAll('.sub-menu-catalog__block');
if (menuBlock.length) {
	menuBlock.forEach(menuBlock => {
		const menuBlockItems = menuBlock.querySelectorAll('.sub-menu-catalog__category').length;
		menuBlock.classList.add(`sub-menu-catalog__block_${menuBlockItems}`);
	});
}

// Функция будет принимать event (событие)
function documentActions(e) {
	// принимаем в константу нажатый объект:
	const targetElement = e.target;
	// проверка: если нажатый объект принимает атрибут data-parent
	if (targetElement.closest('[data-parent]')) {
		// в константу получаем значение data-атрибута: parent и делаем проверку ( если он есть, то получаем Иначе - нет)
		const subMenuId = targetElement.dataset.parent ? targetElement.dataset.parent : null;
		// в константу получим объект с data-атрибутом: data-submenu с соответствующим ID (data-атрибутом)
		const subMenu = document.querySelector(`[data-submenu="${subMenuId}"]`);
		// проверка: если такой объект имеется
		if (subMenu) {
			// получаем объект (ссылка) с активным классом _sub-menu-active:
			const activeLink = document.querySelector('._sub-menu-active');
			// получаем активный блок с классом _sub-menu-open:
			const activeBlock = document.querySelector('._sub-menu-open');

			// проверка: если активный объект имеется и не равен нажатому объекту
			if (activeLink && activeLink !== targetElement) {
				// тогда у активного объкта (ссылки) отнимаем класс _sub-menu-active:
				activeLink.classList.remove('_sub-menu-active');
				// у активного блока отнимаем класс _sub-menu-open:
				activeBlock.classList.remove('_sub-menu-open');
				document.documentElement.classList.remove('sub-menu-open');
			}
			document.documentElement.classList.toggle('sub-menu-open');
			targetElement.classList.toggle('_sub-menu-active');
			subMenu.classList.toggle('_sub-menu-open');

		} else {
			console.log("sub Menu empty")
		}
		e.preventDefault();
	}
	if (targetElement.closest('.menu-top-header__link_catalog')) {
		// const catalogLink = targetElement.closest('.menu-top-header__link_catalog');
		document.documentElement.classList.add('catalog-open');
		e.preventDefault();
	}
	if (targetElement.closest('.menu-catalog__back')) {
		document.documentElement.classList.remove('catalog-open');
		document.querySelector('._sub-menu-active') ? document.querySelector('._sub-menu-active').classList.remove('_sub-menu-active') : null;
		document.querySelector('._sub-menu-open') ? document.querySelector('._sub-menu-open').classList.remove('_sub-menu-open') : null;
		e.preventDefault();
	}
	if (targetElement.closest('.sub-menu-catalog__back')) {
		document.documentElement.classList.remove('sub-menu-open');
		document.querySelector('._sub-menu-active') ? document.querySelector('._sub-menu-active').classList.remove('_sub-menu-active') : null;
		document.querySelector('._sub-menu-open') ? document.querySelector('._sub-menu-open').classList.remove('_sub-menu-open') : null;
		e.preventDefault();
	}


};

//===================================================================================================================================

// Настройки для слайдера фильтра цены:
if (document.querySelector('.price-filter')) {
	const priceSlider = document.querySelector('.price-filter__slider');

	noUiSlider.create(priceSlider, {
		start: [0, 200000],
		connect: true,
		tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })], //форматирование цен под ползунками в фильтре
		range: {
			'min': [0],
			'max': [200000]
		}
	});

	// При указании цены в полях для ввода, точки переместятся соответственно (4-1:17:25)
	const priceStart = document.getElementById('price-start');
	const priceEnd = document.getElementById('price-end');
	priceStart.addEventListener('change', setPriceValues);
	priceEnd.addEventListener('change', setPriceValues);

	function setPriceValues() {
		let priceStartValue;
		let priceEndValue;
		if (priceStart.value != '') {
			priceStartValue = priceStart.value;
		}
		if (priceEnd.value != '') {
			priceEndValue = priceEnd.value;
		}
		priceSlider.noUiSlider.set([priceStartValue, priceEndValue]);
	}
}

//=================================================================================================================================

// При нажатии на заголовок ФИЛЬТР ТОВАРОВ выезжает фильтр (на малых экранах) 4-2:16:09 :

if (isMobile.any()) {
	const filterTitle = document.querySelector('.filter__title');
	filterTitle.addEventListener("click", function (e) {
		filterTitle.classList.toggle('_active');
		_slideToggle(filterTitle.nextElementSibling);
	});
}

//==================================================================================================================================



