import { FC, useEffect, useRef, useState } from 'react'
import s from './Carousel.module.scss'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { FaChevronLeft } from 'react-icons/fa'
import { FaChevronRight } from 'react-icons/fa'
import { AvatarCarouselProps } from '@/utils/avatar-carousels'
import Image from 'next/image'
import CardItem from '@/components/ui/Card-item/Card-item'
import { ICardItem } from '@/interfaces/card-item.interface'
import { CarouselData } from '@/interfaces/carousel-data.type'
import { IGenreCard } from '@/interfaces/genre-card.interface'
import Link from 'next/link'

interface ArrowProps {
	onClick: () => void
	disabled: boolean
	type: 'next' | 'prev'
}

function SampleArrow(props: ArrowProps) {
	const { onClick, disabled, type } = props
	return (
		<button
			className={`${s.arrow} ${type === 'prev' ? s.prev : s.next}`}
			onClick={onClick}
			disabled={disabled}
		>
			{type === 'prev' ? (
				<FaChevronLeft fontSize={20} />
			) : (
				<FaChevronRight fontSize={20} />
			)}
		</button>
	)
}

const Carousel: FC<{
	slider: CarouselData
	onClick?: (path: string) => void
	slidePerView: number
}> = ({ slider, onClick, slidePerView }) => {
	const handleBeforeChange = (oldIndex: number, newIndex: number) => {
		setCurrentSlide(newIndex)
	}

	const settings = {
		speed: 500,
		slidesToShow: slidePerView,
		slidesToScroll: slidePerView,
		infinite: false,
		beforeChange: handleBeforeChange,
		arrows: false,
	}

	const [currentSlide, setCurrentSlide] = useState(0)

	const sliderRef = useRef<Slider | null>(null)

	const goToNext = () => {
		if (sliderRef.current) {
			sliderRef.current.slickNext()
		}
	}

	const goToPrev = () => {
		if (sliderRef.current) {
			sliderRef.current.slickPrev()
		}
	}

	const [disabledButtons, setDisabledButtons] = useState({
		prev: false,
		next: false,
	})

	useEffect(() => {
		const isAtStart = currentSlide === 0
		const isAtEnd =
			slider.type === 'genres'
				? currentSlide >= slider.items.length - slidePerView
				: currentSlide >= slider.items.length * (slidePerView - 1) - 1

		setDisabledButtons({
			prev: isAtStart,
			next: isAtEnd,
		})
	}, [currentSlide, slider.type, slider.items.length, slidePerView])

	const PF = process.env.NEXT_PUBLIC_FOLDER

	return (
		<div className={s.block}>
			<span className={s.title}>{slider.title}</span>
			<div className={s.slider}>
				<Slider ref={sliderRef} {...settings}>
					{slider.type !== 'genres'
						? Array.from({ length: slidePerView }).map((_, outerIndex) =>
								slider.items.map((item, index) => {
									const key = `${slider.type}-${outerIndex}-${index}`

									if (slider.type === 'avatars') {
										const avatar = item as string
										const avatarPath = `storage/avatars/${slider.folder}${avatar}`

										return (
											<div
												className={s.slide}
												key={key}
												onClick={() => onClick?.(avatarPath)}
											>
												<div className={s.imgBlock}>
													<Image
														src={`${PF}${avatarPath}`}
														alt={`Avatar ${index + 1}`}
														width={100}
														height={100}
													/>
												</div>
											</div>
										)
									}

									if (slider.type === 'cards') {
										const card = item as ICardItem

										return (
											<div className={s.slide} key={key}>
												<CardItem
													index={index}
													totalItems={slider.items.length}
													item={card}
												/>
											</div>
										)
									}

									return null
								})
						  )
						: slider.items.map((item, index) => {
								const genre = item as IGenreCard
								return (
									<Link
										href={genre.link}
										className={`${s.slide} ${s.genreCard}`}
										key={`genre-${index}`}
									>
										<Image
											width={300}
											height={203}
											alt=''
											src={`${PF}/genre-images/${genre.image}`}
										/>
										<div className={s.overlay} />
									</Link>
								)
						  })}
				</Slider>

				<div className={s.sliderArrows}>
					<SampleArrow
						disabled={disabledButtons.prev}
						onClick={goToPrev}
						type='prev'
					/>
					<SampleArrow
						disabled={disabledButtons.next}
						onClick={goToNext}
						type='next'
					/>
				</div>
			</div>
		</div>
	)
}

export default Carousel
