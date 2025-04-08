import { FC, useState } from 'react'
import s from './Profile-new-item.module.scss'
import { ProfileType } from '@/interfaces/profile.interface'
import { profileTypeLabels } from '@/interfaces/profile.interface'
import TypeLabel from '../Type-label/Type-label'
import axios from 'axios'

const ProfileNewItem: FC<{ type: ProfileType }> = ({ type }) => {
	const hintText: Record<ProfileType, string> = {
		[ProfileType.KID12]:
			'Тут є все, щоб трохи довше вірити в чудеса. Для безпеки частина налаштувань акаунту обмежена.',
		[ProfileType.KID6]:
			'Тут тільки найдобріші мультики та казкові фільми. Для безпеки частина налаштувань акаунту обмежена',
		[ProfileType.ADULT]:
			'Якщо ви дитина вже тільки в душі, дивіться все, що є на MEGOGO',
		[ProfileType.FAMILY]: '',
	}

	return (
		<div className={s.item}>
			<div
				className={s.container}
				style={{ top: type !== 'adult' ? '-13px' : '0' }}
			>
				<div className={s.content}>
					<TypeLabel type={type} avatar={null} />
					<span className={s.name}>{profileTypeLabels[type]}</span>
				</div>
			</div>
			<div className={s.hint}>
				<span>{hintText[type]}</span>
			</div>
		</div>
	)
}

export default ProfileNewItem
