import { IHeaderNav } from './header-nav'

interface IFooterLinks {
	title: string
	link: string
	sub: { content: string; link: string }[]
}

interface IFooterApps {
	img: string
	link: string
}

interface IFooterMedia {
	icon: string
	link: string
}

export const FooterLinksLeft: IFooterLinks = {
	title: 'Користувачам і партнерам',
	link: '',
	sub: [
		{ content: 'Усе про передплати', link: '/subscriptions' },
		{ content: 'Програма лояльності', link: '/loyalty-program' },
		{ content: 'Активувати промокод', link: '/activate-promo' },
		{ content: 'Угода користувача', link: '/user-agreement' },
		{ content: 'Політика конфіденційності', link: '/privacy-policy' },
		{ content: 'Про нас', link: '/about' },
		{ content: 'Вихідні дані медіа', link: '/media-info' },
		{ content: 'Структура власності', link: '/ownership-structure' },
		{ content: 'Розвиваймо MEGOGO разом', link: '/develop-with-us' },
		{ content: 'Контакти для ЗМІ', link: '/press-contacts' },
		{ content: 'Гайдлайни', link: '/guidelines' },
		{ content: 'Способи оплати', link: '/payment-methods' },
		{ content: 'Додати подкаст', link: '/add-podcast' },
		{ content: 'Передплата для закладів', link: '/institution-subscription' },
		{ content: 'Співпраця', link: '/cooperation' },
		{ content: 'Вакансії', link: '/careers' },
		{ content: 'Дистрибуція передплат', link: '/subscription-distribution' },
		{ content: 'Партнерам MEGOGO Освіта', link: '/education-partners' },
		{ content: 'MEGOGO BOOKS', link: '/books' },
	],
}

export const FooterLinksRight: IFooterLinks = {
	title: 'На пристроях',
	link: '/devices',
	sub: [
		{
			content: 'Телевізори та медіаплеєри',
			link: '/tv-and-media-players',
		},
		{ content: 'Мобільні пристрої', link: '/mobile' },
		{ content: "Комп'ютер", link: '/computer' },
		{ content: 'Підключити телевізор', link: '/connect-tv' },
		{ content: 'Приставка MEGOGO', link: '/megogo-box' },
	],
}

export const FooterApps: IFooterApps[] = [
	{
		img: 'smart-tv.png',
		link: '/devices',
	},
	{
		img: 'app-store.png',
		link: 'https://apps.apple.com/ua/app/megogo-%D1%82%D0%B2-%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%D1%8B-%D1%81%D0%BF%D0%BE%D1%80%D1%82/id565967395?l=ru',
	},
	{
		img: 'google-play.png',
		link: 'https://play.google.com/store/apps/details?id=com.megogo.application',
	},
	{
		img: 'app-gallery.png',
		link: 'https://appgallery.huawei.com/#/app/C100562155',
	},
]

export const FooterMedia: IFooterMedia[] = [
	{
		icon: 'facebook.svg',
		link: 'https://www.facebook.com/MegogoUA/',
	},
	{
		icon: 'instagram.svg',
		link: 'https://www.instagram.com/megogo_ua/',
	},
	{
		icon: 'viber.svg',
		link: 'http://bit.ly/30O0FJ0',
	},
	{
		icon: 'telegram.svg',
		link: 'https://t.me/popcorn_night',
	},
	{
		icon: 'tiktok.svg',
		link: 'https://www.tiktok.com/@megogo_ua',
	},
	{
		icon: 'x.svg',
		link: 'https://x.com/megogo_ua',
	},
]

export const FooterNav: IHeaderNav[] = [
	{
		content: 'ТЕЛЕКАНАЛИ',
		link: '/tv-channels',
	},
	{
		content: 'ФІЛЬМИ',
		link: '/movies',
	},
	{
		content: 'МУЛЬТФІЛЬМИ',
		link: '/cartoons',
	},
	{
		content: 'СЕРІАЛИ',
		link: '/series',
	},
	{
		content: 'ШОУ',
		link: '/shows',
	},
	{
		content: 'СПОРТ',
		link: '/sport',
	},
	{
		content: 'ОСВІТА',
		link: '/education',
	},
	{
		content: 'DISCOVERY+',
		link: '/discovery+',
	},
]
