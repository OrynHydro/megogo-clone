import CardItem, { ICardItem } from '@/components/ui/Card-item/Card-item'

export default function Home() {
	const item1: ICardItem = {
		type: 'broadcast',
		broadcastType: 'live',
		title: 'Т/с "Перелітний птах"',
		desc: '26 травня, 20:00',
		thumbnail: 'thumbnail1.jpg',
		channel: 'channel1.jpg',
		discountValue: 'МАКСИМАЛЬНА',
	}
	const item2: ICardItem = {
		type: 'archive',
		title: 'Останні з нас',
		desc: '2023 - 2025, Екшн',
		thumbnail: 'thumbnail2.jpg',
		discountValue: null,
	}
	return (
		<div className='content-wrapper'>
			<CardItem item={item1} />
			<CardItem item={item2} />
		</div>
	)
}
