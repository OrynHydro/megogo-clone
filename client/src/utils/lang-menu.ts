export interface ILangMenu {
	content: string
	short: string
	subcategory?: ILangMenu[]
}

export const langMenu: ILangMenu = {
	content: 'Українська',
	short: 'UA',
	subcategory: [
		{ content: 'Русский', short: 'RU' },
		{ content: 'English', short: 'EN' },
		{ content: 'Azərbaycanca', short: 'AZ' },
		{ content: 'Español', short: 'ES' },
		{ content: 'Eesti', short: 'ET' },
		{ content: 'ქართული', short: 'KA' },
		{ content: 'Қазақша', short: 'KK' },
		{ content: 'Lietuvių', short: 'LT' },
		{ content: 'Latviešu', short: 'LV' },
		{ content: 'Polski', short: 'PL' },
		{ content: 'Română', short: 'RO' },
	],
}
