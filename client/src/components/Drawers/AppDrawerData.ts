// eslint-disable-next-line max-classes-per-file
export class DrawerButton {
	name: string

	link: string

	constructor(name: string) {
		this.name = name
		this.link = `/${name}`
	}
}

export type SubCategoryButtons = Array<DrawerButton>

export class Category {
	categoryName: string

	subCategories?: SubCategoryButtons

	constructor(name: string) {
		this.categoryName = name
	}

	addSubCategories(subCategoryList: SubCategoryButtons) {
		this.subCategories = subCategoryList
		return this
	}
}
