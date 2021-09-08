interface LinksObject {
	[key: string]: string
}

export class AccordionData {
	name: string

	linkData: Array<{
		linkName: string
		linkPath: string
	}>

	constructor(name: string) {
		this.name = name
		this.linkData = []
	}

	addLinks(data: LinksObject) {
		Object.keys(data).forEach(key => {
			const linkObject = {
				linkName: key,
				linkPath: data[key],
			}

			this.linkData.push(linkObject)
		})

		return this
	}
}

const myAccount = new AccordionData('My Account').addLinks({
	account: '/account',
})

const weRecommend = new AccordionData('We Recommend').addLinks({
	laptop: '/category/laptop',
})

const customerCare = new AccordionData('Customer Care').addLinks({
	'my account': '/account',
	'track your order': '/trackOrder',
	'customer service': '/customeService',
	faqs: '/faqs',
	'product support': '/support/product',
})

const aboutUs = new AccordionData('about us').addLinks({
	'blog single': '/blogSingle',
	'store directory': '/storeDirectory',
	compare: '/compare',
})

const allAccordionData = [myAccount, weRecommend, customerCare, aboutUs]

export default allAccordionData
