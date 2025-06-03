import { CarouselData } from '@/interfaces/carousel-data.type'
import { IGenreCard } from '@/interfaces/genre-card.interface'

export const GenresCarousel: CarouselData[] = [
	{
		type: 'genres',
		title: 'Обирайте за жанрами',
		items: [
			{
				link: '/filters',
				image: 'filters.jpg',
			},
			{
				link: '/search',
				image: 'search.jpg',
			},
			{
				link: '/comedy',
				image: 'comedy.jpg',
			},
			{
				link: '/detective',
				image: 'detective.jpg',
			},
			{
				link: '/family',
				image: 'family.jpg',
			},
			{
				link: '/youngest',
				image: 'youngest.jpg',
			},
			{
				link: '/kids',
				image: 'kids.jpg',
			},
			{
				link: '/documentary',
				image: 'documentaries.jpg',
			},
			{
				link: '/cartoons',
				image: 'cartoons.jpg',
			},
		] as IGenreCard[],
	},
]
