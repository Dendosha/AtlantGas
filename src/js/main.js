// ===== Prevent content shifting when hiding scrollbar =====
// import contentShiftPreventer from "../../libs/content-shift-preventer/contentShiftPreventer.js"



// ===== Burger menu =====
// import BurgerMenu from "../../libs/burger-menu/burgerMenu.js"

// ===== Usage =====
// const burgerButton = document.querySelector('button.--burger')
// const navigation = document.getElementById('navigation-body')
// const closeMediaQuery = matchMedia(`(min-width: ${1000 / 16}em)`)

// function resetBurgerAnimation() {
// 	burgerButton.firstElementChild.style.animationPlayState = 'paused'
// 	burgerButton.firstElementChild.style.animationDirection = 'reverse'
// }

// function openCallback() {
// 	preventContentShift(0)

// 	burgerButton.firstElementChild.style.animationPlayState = 'running'
// 	burgerButton.firstElementChild.style.animationDirection = 'normal'
// }

// new BurgerMenu(burgerButton, navigation, {
// 	closeMediaQuery,
// 	openCallback: [openCallback],
// 	closeCallback: [preventContentShift, 1],
// 	setupCallback: [resetBurgerAnimation],
// 	mediaCallback: [resetBurgerAnimation],
// })



// ===== Tabs =====
// import Tabs from "./libs/a11y-tabs/a11yTabs.js"

// const pageTabs = document.querySelectorAll('[data-tabs="tabs"]')
// pageTabs.forEach(tabs => {
// 	new Tabs(tabs, {

// 	})
// })



// ===== Element mover =====
// import ElementMover from "../../libs/element-mover/elementMover.js"

// ===== Usage =====
// const elementsToMove = document.querySelectorAll('[data-mover]')
// elementsToMove.forEach(element => {
// 	const options = element.dataset.mover.split(',')

// 	const newParent = document.getElementById(options[2]?.trim())
// 	const position = options[3]?.trim() ?? '-1'

// 	new ElementMover(element, element.parentElement, newParent, {
// 		queryType: options[0]?.trim(),
// 		querySize: options[1]?.trim(),
// 		position,
// 		newParentCallback: [console.log, 'new'],
// 		oldParentCallback: [console.log, 'old'],
// 	})
// })



// ===== Custom select =====
// import SelectList from "../../libs/selectlist/selectlist.js";

// ===== Usage =====
// const selectLists = document.querySelectorAll('[data-custom-element="selectlist"]')

// selectLists.forEach(element => {
// 	const options = {
// 		placeholder: element.dataset?.placeholder,
// 		label: element.dataset?.label,
// 		labelledby: element.dataset?.labelledby,
// 		listboxId: element.dataset.listboxId`,
// 		selectlistItems: element.dataset?.selectlistItems?.split(/;\s*/g),
// 		selectedItemIndex: element.dataset?.selectedItemIndex,
// 		visibleItemsCount: 4,
// 	}

// 	new SelectList(element, options)
// })



// ===== Modal window =====
// import ModalWindow from "../../libs/modal-window/modalWindow.js"

// ===== Usage =====
// const modals = document.querySelectorAll('[data-custom-element="dialog"]')

// modals.forEach(element => {
// 	const options = {
// 		state: element.dataset.state ?? 'closed',
// 		closeButtonSelector: '[data-close-button]',
// 		openButtonSelector: `[data-modal-open = ${element.id}]`,
// 		openCallback: [contentShiftPreventer, 0],
// 		closeCallback: [contentShiftPreventer, 1],
// 	}

// 	new ModalWindow(element, options)
// })



const activatableElements = Array.from(document.querySelectorAll('button, a'))

document.documentElement.addEventListener('touchstart', handleElementActivation)
document.documentElement.addEventListener('touchend', handleElementActivation)

function handleElementActivation(e) {
	const activatableElement = e.target.closest('button, a')

	if (activatableElements.includes(activatableElement)) {
		if (e.type === 'touchstart') {
			activatableElement.classList.add('--active')
		} else if (e.type === 'touchend') {
			activatableElement.classList.remove('--active')
		}
	}
}



// Header script
import "./blocks/header.js"

// Footer script
import "./blocks/footer.js"

// Other scripts