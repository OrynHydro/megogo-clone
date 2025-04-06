import { FC } from 'react'
import s from './Profile-item.module.scss'
import { IUser } from '@/interfaces/user.interface'
import { IProfile, ProfileType } from '@/interfaces/profile.interface'
import Image from 'next/image'
import { GoPlus } from 'react-icons/go'

interface ProfileItemProps {
	user: IUser
	profile: IProfile
}

const ProfileItem: FC<ProfileItemProps> = ({ user, profile }) => {
	const PF = process.env.NEXT_PUBLIC_FOLDER
	const profileTypeClass = {
		family: s.family,
		kid12: s.kid,
		kid6: s.kid,
		adult: s.adult,
	}[profile.type]

	const profileTypeLabels: Record<ProfileType, string> = {
		[ProfileType.FAMILY]: 'Сімейний',
		[ProfileType.KID12]: 'KIDS',
		[ProfileType.KID6]: 'KIDS',
		[ProfileType.ADULT]: 'Дорослий',
	}

	return (
		<div className={s.profile}>
			<div className={s.imgBlock}>
				{profile.avatar ? (
					<Image
						className={s.img}
						src={`${PF + profile.avatar}`}
						alt='Profile'
						width={128}
						height={128}
					/>
				) : (
					<div className={s.img}>
						<GoPlus fontSize={48} />
					</div>
				)}
			</div>

			<span className={s.name}>{profile.name}</span>
			{!(profile.type === ProfileType.FAMILY && !profile.avatar) && (
				<span className={`${s.type} ${profileTypeClass}`}>
					{profileTypeLabels[profile.type]}
				</span>
			)}
		</div>
	)
}

export default ProfileItem
