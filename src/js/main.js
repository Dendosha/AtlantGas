// ===== Custom select =====
import SelectList from "./libs/selectlist/selectlist.js";

// Imask
import IMask from 'imask';

// ===== Usage =====
const selectLists = document.querySelectorAll('[data-custom-element="selectlist"]')

selectLists.forEach(element => {
	const options = {
		placeholder: element.dataset?.placeholder,
		label: element.dataset?.label,
		listboxId: element.dataset.listboxId,
		inputName: element.dataset?.inputName,
		selectlistItems: element.dataset?.selectlistItems?.split(/;\s*/g),
		selectlistItemsIdPrefix: element.dataset?.itemsIdPrefix,
		selectedItemIndex: element.dataset?.selectedItemIndex,
		visibleItemsCount: 4,
	}

	new SelectList(element, options)
})



// Tabs
import Tabs from "./libs/a11y-tabs/a11yTabs.js";

const pageTabs = document.querySelectorAll('[data-tabs="tabs"]')
pageTabs.forEach(tabs => {
	new Tabs(tabs, {
		openTabCallback: function () {
			if (tabs !== document.querySelector('.gas-volume-selection')) return

			const gasVolumesSelectList = SelectList.find(document.getElementById('order-form-selectlist'))
			const gasVolumesTabs = document.querySelectorAll('.gas-volumes a[role="tab"]')

			for (let i = 0; i < gasVolumesTabs.length; i++) {
				if (gasVolumesTabs[i].getAttribute('aria-selected') === 'true') {
					gasVolumesSelectList.select(`gas-volumes-listbox-${i}`)
					break
				}
			}
		},
	})
})



// ===== Modal window =====
import ModalWindow from "./libs/modal-window/modalWindow.js"

// ===== Usage =====
const modals = document.querySelectorAll('[data-custom-element="dialog"]')

modals.forEach(element => {
	const options = {
		state: element.dataset.state ?? 'closed',
		closeButtonSelector: '[data-close-button]',
		openButtonSelector: `[data-modal-open = ${element.id}]`,
	}

	new ModalWindow(element, options)
})



// Active elements handler
const activatableElements = Array.from(document.querySelectorAll('button, a, .ymaps3x0--button'))

document.documentElement.addEventListener('pointerdown', handleElementActivation)
document.documentElement.addEventListener('pointerup', handleElementActivation)
document.documentElement.addEventListener('pointerout', handleElementActivation)

function handleElementActivation(e) {
	const activatableElement = e.target.closest('button, a, .ymaps3x0--button')

	if (e.type === 'pointerout' && activatableElement) {
		activatableElement.classList.remove('--active')
	}

	if (activatableElements.includes(activatableElement)) {
		if (e.type === 'pointerdown') {
			activatableElement.classList.add('--active')
		} else if (e.type === 'pointerup') {
			activatableElement.classList.remove('--active')
		}
	}
}



// Form sending
const formSendModalElement = document.querySelector('.form-send-modal')
const orderFormModalElement = document.querySelector('.order-form-modal')

const formSendTitle = formSendModalElement.querySelector('.form-send-modal__title')
const formSendText = formSendModalElement.querySelector('.form-send-modal__text')
const formSendState = formSendModalElement.querySelector('.form-send-modal__state')

const formSendModalWindow = ModalWindow.all.find(modal => modal.element === formSendModalElement)
const orderFormModalWindow = ModalWindow.all.find(modal => modal.element === orderFormModalElement)

for (const form of document.forms) {
	for (const field of form.elements) {
		if (field.type === 'tel') {
			new IMask(field, {
				mask: '+{7} (000) 000-00-00'
			})
		} else continue
	}

	form.addEventListener('submit', (e) => {
		e.preventDefault()
		formSend(form)
	})
}

async function formSend(form) {
	const formData = new FormData(form)

	form.reset()

	if (orderFormModalElement.getAttribute('data-state') === 'opened') orderFormModalWindow.close()
	formSendModalWindow.open()

	try {
		let response = await fetch(form.action, {
			method: 'POST',
			body: formData,
		})

		let result = await response.json()

		if (response.ok) {
			formSendState.classList.add('--ok')
			formSendTitle.innerText = 'Сообщение отправлено'
		} else {
			formSendState.classList.add('--error')
			formSendTitle.innerText = 'Сообщение не отправлено'
		}

		formSendText.innerText = result
	} catch (e) {
		formSendState.classList.add('--error')
		formSendTitle.innerText = 'Сообщение не отправлено'

		formSendText.innerText = `Произошла ошибка: ${e.message}`
	}

	if (formSendModalElement.getAttribute('data-state') === 'closed') formSendModalWindow.open()
}



// Header script
import "./blocks/header.js"

// Footer script
import "./blocks/footer.js"

// Other scripts
