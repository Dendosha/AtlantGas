import Tabs from "./libs/a11y-tabs/a11yTabs.js"

import Swiper from 'swiper'
import { Navigation, Pagination, EffectCards } from 'swiper/modules'

const pageTabs = document.querySelectorAll('[data-tabs="tabs"]')
pageTabs.forEach(tabs => {
	new Tabs(tabs, {

	})
})

const swiper = new Swiper('.swiper', {
	modules: [Navigation, Pagination, EffectCards],

	effect: 'cards',
	grabCursor: true,

	cardsEffect: {
		rotate: false,
		perSlideOffset: 10,
		slideShadows: false,
	},

	// If we need pagination
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
})