'use client'
import { FC, useRef, useState } from 'react'
import s from './Card-item.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { FaPlay } from 'react-icons/fa6'
import { FaRegBookmark } from 'react-icons/fa'
import { FaRegClock } from 'react-icons/fa'
import { AiFillLike } from 'react-icons/ai'
import { AiFillDislike } from 'react-icons/ai'
import { ICardItem } from '@/interfaces/card-item.interface'

interface CardItemProps {
	item: ICardItem
	index: number
	totalItems: number
}

const CardItem: FC<CardItemProps> = ({ item, index, totalItems }) => {
	const PF = process.env.NEXT_PUBLIC_FOLDER

	const [hoverTooltip, setHoverTooltip] = useState<boolean>(false)
	const timerRef = useRef<number | null>(null)
	const hideTimerRef = useRef<number | null>(null)

	const isLastTwo = index >= totalItems - 2

	const handleMouseOver = () => {
		if (item.type === 'archive') {
			if (hideTimerRef.current !== null) {
				clearTimeout(hideTimerRef.current)
				hideTimerRef.current = null
			}
			timerRef.current = window.setTimeout(() => {
				setHoverTooltip(true)
			}, 2000)
		}
	}

	const handleMouseOut = () => {
		if (item.type === 'archive') {
			if (timerRef.current !== null) {
				clearTimeout(timerRef.current)
				timerRef.current = null
			}
			hideTimerRef.current = window.setTimeout(() => {
				setHoverTooltip(false)
				hideTimerRef.current = null
			}, 100)
		}
	}

	return (
		<Link
			href={'#'}
			className={s.card}
			title={item.title}
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
		>
			<div
				className={`${s.thumbnail} ${
					item.type === 'broadcast' ? s.broadcast : s.archive
				} ${hoverTooltip ? s.open : ''}`}
			>
				{item.type === 'broadcast' && (
					<>
						<div
							className={`${s.broadcastType} ${
								item.broadcastType === 'live' ? s.live : s.recorded
							}`}
						>
							{item.broadcastType === 'live' ? 'ЕФІР' : 'У ЗАПИСІ'}
						</div>
						<Image
							width={40}
							height={40}
							alt=''
							src={PF + `/card-pictures/${item.channel}`}
							className={s.channel}
						/>
					</>
				)}

				<Image
					className={s.cover}
					width={item.type === 'broadcast' ? 300 : 193}
					height={item.type === 'broadcast' ? 168 : 278}
					alt=''
					src={PF + `/card-pictures/${item.thumbnail}`}
				/>
				<div className={s.overlay}>
					<FaPlay fontSize={30} />
					<span>Дивитися</span>
					{item.type === 'archive' && (
						<FaRegBookmark className={s.bookmark} fontSize={18} />
					)}
				</div>
				{item.type === 'archive' && (
					<div className={`${s.tooltip} ${isLastTwo ? s.tooltipLeft : ''}`}>
						<div className={s.container}>
							<p className={s.fullDesc}>
								Дія фантастично-драматичного серіалу Одні з нас, що вийшов на
								екрани 2023 року, відбувається в майбутньому після апокаліпсису,
								що стався на Землі на території колишніх Сполучених Штатів
								Америки. Двадцять років тому поширилася жахлива пандемія, що
								стала наслідком
							</p>
							<div className={s.extra}>
								<span className={s.quality}>Full HD</span>
								<span className={s.age}>18+</span>
								<span className={s.rating}>
									<b className={s.value}>7.2</b> IMDb
								</span>
								<span className={s.rating}>
									<b className={s.value}>8.5</b> MGG
								</span>
								<span className={s.duration}>
									<FaRegClock fontSize={12} color='#808080' /> 93 хвилини
								</span>
							</div>
							<div className={s.buttonBlock}>
								<button className={s.like}>
									<AiFillLike color='#777777' /> 943
								</button>
								<button className={s.dislike}>
									<AiFillDislike color='#777777' /> 943
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
			<div className={s.desc}>
				<h4 className={s.title}>{item.title}</h4>
				<p className={s.startDateTime}>{item.desc}</p>
				<div className={s.discount}>
					{item.discountValue && (
						<span className={s.discountLabel}>
							{item.discountValue === 'МАКСИМАЛЬНА'
								? 'АКЦІЯ'
								: item.discountValue}
						</span>
					)}

					{item.discountValue === 'МАКСИМАЛЬНА' ? (
						<span className={s.discountValue}>{item.discountValue}</span>
					) : (
						<span className={s.purchase}>ПОКУПКА</span>
					)}
				</div>
			</div>
		</Link>
	)
}

export default CardItem
