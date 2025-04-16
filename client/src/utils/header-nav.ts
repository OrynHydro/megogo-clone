export interface IHeaderNav {
	content?: string
	link: string
	subcategory?: IHeaderNav[]
}

export const headerProfileDropdown: IHeaderNav[] = [
	{
		content: 'Передплати і платежі',
		link: '/profile',
	},
	{
		content: 'Мої пристрої',
		link: '/devices',
	},
	{
		content: 'Налаштування акаунту',
		link: '/edit',
	},
]

export const headerNav: IHeaderNav[] = [
	{
		content: 'ТЕЛЕКАНАЛИ',
		link: '/tv-channels',
		subcategory: [
			{
				content: 'Спорт',
				link: '/tv-channels/sport',
			},
			{
				content: 'Фільми та серіали',
				link: '/tv-channels/movies-series',
			},
			{
				content: 'Розважальні',
				link: '/tv-channels/entertainment',
			},
			{
				content: 'Пізнавальні',
				link: '/tv-channels/educational',
			},
			{
				content: 'Дитячі',
				link: '/tv-channels/kids',
			},
			{
				content: 'Безкоштовне ТБ',
				link: '/tv-channels/free-tv',
			},
		],
	},
	{
		content: 'ФІЛЬМИ',
		link: '/movies',
		subcategory: [
			{
				content: "Прем'єри",
				link: '/movies/premieres',
			},
			{
				content: 'Зараз у передплаті',
				link: '/movies/subscription',
			},
			{
				content: 'Що зараз шукають',
				link: '/movies/popular',
			},
			{
				content: 'Трейлери',
				link: '/movies/trailers',
			},
		],
	},
	{
		content: 'МУЛЬТФІЛЬМИ',
		link: '/cartoons',
		subcategory: [
			{
				content: 'Мультфільми Disney',
				link: '/cartoons/disney',
			},
			{
				content: 'Мультфільми Nickelodeon',
				link: '/cartoons/nickelodeon',
			},
			{
				content: 'Українською мовою',
				link: '/cartoons/ukrainian',
			},
			{
				content: 'Новинки',
				link: '/cartoons/new',
			},
		],
	},
	{
		content: 'СЕРІАЛИ',
		link: '/series',
		subcategory: [
			{
				content: 'Серіали НВО',
				link: '/series/hbo',
			},
			{
				content: 'Українські',
				link: '/series/ukrainian',
			},
			{
				content: 'Серіали Paramount+',
				link: '/series/paramount',
			},
			{
				content: 'Новинки',
				link: '/series/new',
			},
		],
	},
	{
		content: 'ШОУ',
		link: '/shows',
		subcategory: [
			{
				content: 'Блогери',
				link: '/shows/bloggers',
			},
			{
				content: 'Discovery',
				link: '/shows/discovery',
			},
			{
				content: 'Аудіокниги та подкасти',
				link: '/shows/audiobooks-podcasts',
			},
			{
				content: 'MEGOGO LIVE',
				link: '/shows/megogo-live',
			},
			{
				content: 'Розважальні',
				link: '/shows/entertainment',
			},
		],
	},
	{
		content: 'СПОРТ',
		link: '/sport',
		subcategory: [
			{
				content: 'Футбол',
				link: '/sport/football',
			},
			{
				content: 'Єдиноборства',
				link: '/sport/martial-arts',
			},
			{
				content: 'Теніс',
				link: '/sport/tennis',
			},
			{
				content: 'Більше спорту',
				link: '/sport/more',
			},
			{
				content: 'Кіберспорт',
				link: '/sport/esports',
			},
		],
	},
	{
		content: 'ОСВІТА',
		link: '/education',
		subcategory: [
			{
				content: 'Бібліотека Projector',
				link: '/education/projector',
			},
			{
				content: 'Тренування SMARTASS',
				link: '/education/smartass',
			},
			{
				content: 'Популярні мови',
				link: '/education/languages',
			},
			{
				content: 'ІТ, бізнес і креатив',
				link: '/education/it-business-creative',
			},
			{
				content: 'Освіта для дітей',
				link: '/education/kids',
			},
			{
				content: 'Саморозвиток',
				link: '/education/self-development',
			},
		],
	},
	{
		link: '/more',
		subcategory: [
			{
				content: 'MEGOGO BOOKS',
				link: '/more/megogo-books',
			},
			{
				content: 'Усе про передплати',
				link: '/more/subscriptions',
			},
			{
				content: 'Благодійність',
				link: '/more/charity',
			},
			{
				content: 'Передплата для закладів',
				link: '/more/institutional-subscription',
			},
			{
				content: 'Спійчай пірата',
				link: '/more/catch-pirate',
			},
			{
				content: 'Активувати промокод',
				link: '/more/activate-promo',
			},
			{
				content: 'Програма лояльності',
				link: '/more/loyalty-program',
			},
			{
				content: 'Дивись як чутно',
				link: '/more/watch-as-heard',
			},
			{
				content: 'Приставка MEGOGO',
				link: '/more/megogo-box',
			},
			{
				content: 'Дистрибуція передплат',
				link: '/more/subscription-distribution',
			},
			{
				content: 'Кіно+',
				link: '/more/kino-plus',
			},
			{
				content: 'Що подивитися',
				link: '/more/what-to-watch',
			},
			{
				content: 'Знижки та поради',
				link: '/more/discounts-tips',
			},
			{
				content: 'Запропонувати фільм або серіал',
				link: '/more/suggest-content',
			},
			{
				content: 'Корисні посилання',
				link: '/more/useful-links',
			},
			{
				content: 'Онлайн ТБ MEGOGO',
				link: '/more/online-tv',
			},
		],
	},
]
