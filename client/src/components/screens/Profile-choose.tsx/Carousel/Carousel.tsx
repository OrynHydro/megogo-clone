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

export type CarouselData =
	| { type: 'avatars'; title: string; folder: string; items: string[] }
	| { type: 'cards'; title: string; items: ICardItem[] }

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
		if (currentSlide === 0) {
			setDisabledButtons({ prev: true, next: false })
		} else if (currentSlide >= slider.items.length * (slidePerView - 1) - 1) {
			setDisabledButtons({ prev: false, next: true })
		} else {
			setDisabledButtons({ prev: false, next: false })
		}
	}, [currentSlide])

	const PF = process.env.NEXT_PUBLIC_FOLDER

	return (
		<div className={s.block}>
			<span className={s.title}>{slider.title}</span>
			<div className={s.slider}>
				<Slider ref={sliderRef} {...settings}>
					{Array.from({ length: slidePerView }).map((_, outerIndex) =>
						slider.items.map((item, index) => {
							if (slider.type === 'avatars') {
								const avatar = item as string
								return (
									<div
										className={s.slide}
										key={`avatar-${outerIndex}-${index}`}
										onClick={() => {
											if (onClick) {
												onClick(`storage/avatars/${slider.folder}${avatar}`)
											}
										}}
									>
										<div className={s.imgBlock}>
											<Image
												src={`${PF}storage/avatars/${slider.folder}${avatar}`}
												alt={`Avatar ${index + 1}`}
												width={100}
												height={100}
											/>
										</div>
									</div>
								)
							} else if (slider.type === 'cards') {
								const card = item as ICardItem
								return (
									<div className={s.slide} key={`card-${outerIndex}-${index}`}>
										<CardItem
											index={index}
											totalItems={slider.items.length}
											item={card}
										/>
									</div>
								)
							}
						})
					)}
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
