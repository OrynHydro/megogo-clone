import { CarouselData } from '@/interfaces/carousel-data.type'
import { ICardItem } from '@/interfaces/card-item.interface'

export const BroadcastCarousel: CarouselData[] = [
	{
		type: 'cards',
		title: 'Зараз на ТБ',
		items: [
			{
				type: 'broadcast',
				broadcastType: 'live',
				title: 'Т/с "Перелітний птах"',
				desc: '26 травня, 20:00',
				thumbnail: 'thumbnail1.jpg',
				channel: 'channel1.jpg',
				discountValue: 'МАКСИМАЛЬНА',
			},
			{
				type: 'broadcast',
				broadcastType: 'live',
				title: 'Т/с "Перелітний птах"',
				desc: '26 травня, 20:00',
				thumbnail: 'thumbnail1.jpg',
				channel: 'channel1.jpg',
				discountValue: 'МАКСИМАЛЬНА',
			},
			{
				type: 'broadcast',
				broadcastType: 'live',
				title: 'Т/с "Перелітний птах"',
				desc: '26 травня, 20:00',
				thumbnail: 'thumbnail1.jpg',
				channel: 'channel1.jpg',
				discountValue: 'МАКСИМАЛЬНА',
			},
			{
				type: 'broadcast',
				broadcastType: 'live',
				title: 'Т/с "Перелітний птах"',
				desc: '26 травня, 20:00',
				thumbnail: 'thumbnail1.jpg',
				channel: 'channel1.jpg',
				discountValue: 'МАКСИМАЛЬНА',
			},
		] as ICardItem[],
	},
]

export const ArchiveCarousel: CarouselData[] = [
	{
		type: 'cards',
		title: 'Топ переглядів на MEGOGO',
		items: [
			{
				type: 'archive',
				title: 'Останні з нас',
				desc: '2023 - 2025, Екшн',
				thumbnail: 'thumbnail2.jpg',
				discountValue: null,
			},
			{
				type: 'archive',
				title: 'Останні з нас',
				desc: '2023 - 2025, Екшн',
				thumbnail: 'thumbnail2.jpg',
				discountValue: null,
			},
			{
				type: 'archive',
				title: 'Останні з нас',
				desc: '2023 - 2025, Екшн',
				thumbnail: 'thumbnail2.jpg',
				discountValue: null,
			},
			{
				type: 'archive',
				title: 'Останні з нас',
				desc: '2023 - 2025, Екшн',
				thumbnail: 'thumbnail2.jpg',
				discountValue: null,
			},
			{
				type: 'archive',
				title: 'Останні з нас',
				desc: '2023 - 2025, Екшн',
				thumbnail: 'thumbnail2.jpg',
				discountValue: null,
			},
			{
				type: 'archive',
				title: 'Останні з нас',
				desc: '2023 - 2025, Екшн',
				thumbnail: 'thumbnail2.jpg',
				discountValue: null,
			},
		] as ICardItem[],
	},
]
