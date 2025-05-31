export interface ICardItem {
	type: 'broadcast' | 'archive'
	broadcastType?: 'live' | 'recorded'
	title: string
	desc: string
	thumbnail: string
	channel?: string
	discountValue: string | null
}
