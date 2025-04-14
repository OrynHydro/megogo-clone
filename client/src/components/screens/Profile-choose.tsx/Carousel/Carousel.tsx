import { FC, useEffect, useRef, useState } from 'react'
import s from './Carousel.module.scss'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { FaChevronLeft } from 'react-icons/fa'
import { FaChevronRight } from 'react-icons/fa'
import { AvatarCarouselProps } from '@/utils/avatar-carousels'
import Image from 'next/image'

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
	slider: AvatarCarouselProps
	onClick: (path: string) => void
}> = ({ slider, onClick }) => {
	const handleBeforeChange = (oldIndex: number, newIndex: number) => {
		setCurrentSlide(newIndex)
	}

	const settings = {
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 6,
		infinite: false,
		beforeChange: handleBeforeChange,
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
		} else if (currentSlide >= slider.avatars.length * 5 - 1) {
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
					{Array.from({ length: 6 }).map(_ =>
						slider.avatars.map((avatar, index) => (
							<div
								className={s.slide}
								key={index}
								onClick={() =>
									onClick(`storage/avatars/${slider.folder}${avatar}`)
								}
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
						))
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
