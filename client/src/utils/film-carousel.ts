import { CarouselData } from '@/components/screens/Profile-choose.tsx/Carousel/Carousel'
import { ICardItem } from '@/interfaces/card-item.interface'

export const BroadcastCarousel: CarouselData[] = [
	{
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
		],
	},
].map(item => ({
	type: 'cards',
	title: 'Зараз на ТБ',
	items: item.items as ICardItem[],
}))

export const ArchiveCarousel: CarouselData[] = [
	{
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
		],
	},
].map(item => ({
	type: 'cards',
	title: item.title,
	items: item.items as ICardItem[],
}))
