import { FC } from 'react'
import s from './Card-item.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { FaPlay } from 'react-icons/fa6'
import { FaRegBookmark } from 'react-icons/fa'

interface CardItemProps {
	item: ICardItem
}
export interface ICardItem {
	type: 'broadcast' | 'archive'
	broadcastType?: 'live' | 'recorded'
	title: string
	desc: string
	thumbnail: string
	channel?: string
	discountValue: string | null
}

const CardItem: FC<CardItemProps> = ({ item }) => {
	const PF = process.env.NEXT_PUBLIC_FOLDER
	return (
		<Link href={'#'} className={s.card} title={item.title}>
			<div
				className={`${s.thumbnail} ${
					item.type === 'broadcast' ? s.broadcast : s.archive
				}`}
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
