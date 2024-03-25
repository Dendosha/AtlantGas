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

const faqAccordion = document.querySelector('.faq__accordion')
faqAccordion.addEventListener('click', (e) => {
	const currentDetails = e.target.closest('details')

	if (currentDetails) {
		e.preventDefault()

		const detailsContent = currentDetails.querySelector('.faq__answer')
		const animationDuration = parseFloat(getComputedStyle(detailsContent).getPropertyValue('--animation-duration')) * 1000

		if (!currentDetails.hasAttribute('open')) {
			currentDetails.setAttribute('open', '')
		} else {
			currentDetails.classList.add('--closing')

			setTimeout(() => {
				currentDetails.classList.remove('--closing')
				currentDetails.removeAttribute('open')
			}, animationDuration)
		}
	}
})