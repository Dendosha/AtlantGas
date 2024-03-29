import Tabs from "./libs/a11y-tabs/a11yTabs.js"

import Swiper from 'swiper'
import { Navigation, Pagination, EffectCards } from 'swiper/modules'

// Slider
const swiper = new Swiper('.swiper', {
	modules: [Navigation, Pagination, EffectCards],

	a11y: {
		prevSlideMessage: 'Предыдущий слайд',
		nextSlideMessage: 'Следующий слайд',
		firstSlideMessage: 'Это первый слайд',
		lastSlideMessage: 'Это последний слайд',
		paginationBulletMessage: 'Переключить на слайд {{index}}',
	},

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
		bulletElement: 'button',
		bulletClass: 'swiper-pagination-bullet outlined-element',
	},

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
})

// Accordion
const pageDetails = document.querySelectorAll('.faq__question-block')
const detailsDropdowns = document.querySelectorAll('.faq__answer')

pageDetails.forEach((details, index) => {
	let animationPlaying = false

	details.addEventListener('click', (e) => {
		if (animationPlaying) {
			e.preventDefault()
			console.log('Prevented')
			return
		}

		if (details.hasAttribute('open')) {
			e.preventDefault()
			detailsDropdowns[index].classList.add('--closing')
		} else {
			detailsDropdowns[index].classList.add('--opening')
		}
	})

	detailsDropdowns[index].addEventListener('animationstart', (e) => {
		animationPlaying = true
	})

	detailsDropdowns[index].addEventListener('animationend', (e) => {
		if (detailsDropdowns[index].classList.contains('--closing')) {
			detailsDropdowns[index].classList.remove('--closing')
			details.removeAttribute('open')
		} else if (detailsDropdowns[index].classList.contains('--opening')) {
			detailsDropdowns[index].classList.remove('--opening')
		}

		animationPlaying = false
	})
})

// Scrolldown button
const scrolldownButton = document.querySelector('[data-scrolldown]')
const elementToScroll = document.getElementById(scrolldownButton.getAttribute('data-scrolldown'))

scrolldownButton.addEventListener('click', (e) => {
	elementToScroll.scrollIntoView(true)
})