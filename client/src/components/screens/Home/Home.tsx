'use client'
import { ICardItem } from '@/interfaces/card-item.interface'
import CardItem from '@/components/ui/Card-item/Card-item'
import Carousel from '@/components/screens/Profile-choose.tsx/Carousel/Carousel'
import { ArchiveCarousel, BroadcastCarousel } from '@/utils/film-carousel'
import { FC } from 'react'
import s from './Home.module.scss'
import Link from 'next/link'
import { GenresCarousel } from '@/utils/genre-carousel'

const HomePage: FC = () => {
	return (
		<main className={s.home}>
			{BroadcastCarousel.map((slider, index) => (
				<Carousel key={index} slider={slider} slidePerView={4} />
			))}

			{ArchiveCarousel.map((slider, index) => (
				<Carousel key={index} slider={slider} slidePerView={6} />
			))}

			<div className={s.genres}>
				{GenresCarousel.map((slider, index) => (
					<Carousel key={index} slider={slider} slidePerView={4} />
				))}
			</div>

			<div className={s.widget}>
				<h1 className={s.title}>Передплата «Максимальна»</h1>
				<p className={s.desc}>
					499 каналів та максимум кіно, серіали від HBO, ексклюзивний спорт,
					аудіо
				</p>
				<div className={s.content}>
					<Link href='#' className={s.tryBtn}>
						Спробувати за 69 грн
					</Link>
					<div className={s.tariffInfo}>
						<span>
							<span className={s.discountLabel}>АКЦІЯ</span>{' '}
							<span className={s.tryAndBuy}>
								Перші 7 днів за 69 грн, далі — 399 грн/міс.
							</span>
						</span>

						<Link href={'#'} className={s.about}>
							Про акцію
						</Link>
					</div>
				</div>
			</div>
		</main>
	)
}

export default HomePage
