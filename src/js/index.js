import Tabs from "./libs/a11y-tabs/a11yTabs.js"

const pageTabs = document.querySelectorAll('[data-tabs="tabs"]')
pageTabs.forEach(tabs => {
	new Tabs(tabs, {

	})
})