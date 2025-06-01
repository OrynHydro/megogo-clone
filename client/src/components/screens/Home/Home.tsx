'use client'
import { ICardItem } from '@/interfaces/card-item.interface'
import CardItem from '@/components/ui/Card-item/Card-item'
import Carousel from '@/components/screens/Profile-choose.tsx/Carousel/Carousel'
import { ArchiveCarousel, BroadcastCarousel } from '@/utils/film-carousel'
import { FC } from 'react'
import s from './Home.module.scss'

const HomePage: FC = () => {
	return (
		<main className={s.home}>
			{BroadcastCarousel.map((slider, index) => (
				<Carousel key={index} slider={slider} slidePerView={4} />
			))}

			{ArchiveCarousel.map((slider, index) => (
				<Carousel key={index} slider={slider} slidePerView={6} />
			))}
		</main>
	)
}

export default HomePage
