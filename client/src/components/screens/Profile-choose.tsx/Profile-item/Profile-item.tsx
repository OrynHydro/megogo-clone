import { FC } from 'react'
import s from './Profile-item.module.scss'
import { IUser } from '@/interfaces/user.interface'
import {
	IProfile,
	ProfileType,
	profileTypeLabels,
} from '@/interfaces/profile.interface'
import Image from 'next/image'
import { GoPlus } from 'react-icons/go'
import TypeLabel from '../Type-label/Type-label'

interface ProfileItemProps {
	profile: IProfile
	isEdit?: boolean
}

const ProfileItem: FC<ProfileItemProps> = ({ profile, isEdit }) => {
	const PF = process.env.NEXT_PUBLIC_FOLDER

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
				<div
					className={`${s.overlay} ${isEdit && profile.avatar ? s.open : ''}`}
				>
					Змінити
				</div>
			</div>

			<span className={s.name}>{profile.name}</span>
			{profile.type === 'family' && (
				<TypeLabel type={profile.type} avatar={profile.avatar} />
			)}
		</div>
	)
}

export default ProfileItem
