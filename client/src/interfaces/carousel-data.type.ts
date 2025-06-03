import { ICardItem } from './card-item.interface'
import { IGenreCard } from './genre-card.interface'

export type CarouselData =
	| { type: 'avatars'; title: string; folder: string; items: string[] }
	| { type: 'cards'; title: string; items: ICardItem[] }
	| { type: 'genres'; title: string; items: IGenreCard[] }
