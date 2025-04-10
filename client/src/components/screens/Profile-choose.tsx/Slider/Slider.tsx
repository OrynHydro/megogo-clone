import { FC, useRef, useState } from 'react'
import s from './Slider.module.scss'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { FaChevronLeft } from 'react-icons/fa'
import { FaChevronRight } from 'react-icons/fa'

function SampleNextArrow(props: any) {
	const { onClick } = props
	return (
		<div className={`${s.arrow} ${s.next}`} onClick={onClick}>
			<FaChevronRight fontSize={20} />
		</div>
	)
}

function SamplePrevArrow(props: any) {
	const { onClick } = props
	return (
		<div className={`${s.arrow} ${s.prev}`} onClick={onClick}>
			<FaChevronLeft fontSize={20} />
		</div>
	)
}

const SliderComponent: FC = () => {
	// const handleInit = (slider: any) => {
	// 	if (slider) {
	// 		setSlideCount(slider.slideCount)
	// 	}
	// }

	// const handleBeforeChange = (oldIndex: number, newIndex: number) => {
	// 	setCurrentSlide(newIndex)
	// }

	const settings = {
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: false,
		// beforeChange: handleBeforeChange,
		// onInit: handleInit,
	}

	// const [currentSlide, setCurrentSlide] = useState(0)
	// const [slideCount, setSlideCount] = useState(0)

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

	// const isPrevDisabled = currentSlide === 0
	// const isNextDisabled = currentSlide === slideCount - 1

	return (
		<div className={s.block}>
			<span>Люди</span>
			<div className={s.slider}>
				<Slider ref={sliderRef} {...settings}>
					<div>
						<h3>1</h3>
						<p>Content for slide 1</p>
					</div>
					<div>
						<h3>2</h3>
						<p>Content for slide 2</p>
					</div>
					<div>
						<h3>3</h3>
						<p>Content for slide 3</p>
					</div>
					<div>
						<h3>4</h3>
						<p>Content for slide 4</p>
					</div>
					<div>
						<h3>5</h3>
						<p>Content for slide 5</p>
					</div>
					<div>
						<h3>6</h3>
						<p>Content for slide 6</p>
					</div>
				</Slider>

				<div className={s.sliderArrows}>
					<SamplePrevArrow onClick={goToPrev} />
					<SampleNextArrow onClick={goToNext} />
				</div>
			</div>
		</div>
	)
}

export default SliderComponent
