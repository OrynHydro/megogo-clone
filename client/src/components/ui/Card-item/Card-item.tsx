import { FC } from 'react'
import s from './Card-item.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { FaPlay } from 'react-icons/fa6'

const CardItem: FC = () => {
	const PF = process.env.NEXT_PUBLIC_FOLDER
	const broadcastType = [s.live, s.recorded]
	const selectedIndex = 0
	return (
		<Link href={'#'} className={s.card}>
			<div className={s.thumbnail}>
				<div className={`${s.broadcastType} ${broadcastType[selectedIndex]}`}>
					{selectedIndex === 0 ? 'ЕФІР' : 'У ЗАПИСІ'}
				</div>
				<Image
					width={40}
					height={40}
					alt=''
					src={PF + '/card-pictures/channel.jpg'}
					className={s.channel}
				/>
				<Image
					className={s.cover}
					width={300}
					height={168}
					alt=''
					src={PF + '/card-pictures/thumbnail.jpg'}
				/>
				<div className={s.overlay}>
					<FaPlay fontSize={30} />
					<span>Дивитися</span>
				</div>
			</div>
			<div className={s.desc}>
				<h4 className={s.title}>Т/с "Перелітний птах"</h4>
				<p className={s.startDateTime}>26 травня, 20:00</p>
				<div className={s.discount}>
					<span className={s.discountLabel}>АКЦІЯ</span>
					<span className={s.discountValue}>МАКСИМАЛЬНА</span>
				</div>
			</div>
		</Link>
	)
}

export default CardItem
