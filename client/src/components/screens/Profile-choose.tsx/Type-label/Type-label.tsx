import { FC } from 'react'
import s from './Type-label.module.scss'
import { ProfileType, profileTypeLabels } from '@/interfaces/profile.interface'

const TypeLabel: FC<{ type: ProfileType; avatar: string | null }> = ({
	type,
	avatar,
}) => {
	const profileTypeClass = {
		family: s.family,
		kid12: s.kid,
		kid6: s.kid,
		adult: s.adult,
	}[type]

	if (type !== 'adult' && !(type === ProfileType.FAMILY && !avatar)) {
		return (
			<span className={`${s.type} ${profileTypeClass}`}>
				{type === 'kid12' || type === 'kid6' ? 'KIDS' : profileTypeLabels[type]}
			</span>
		)
	}

	return null
}

export default TypeLabel
