import { IProfileGeneral } from '@shared/interfaces/profile.interface'

export enum ProfileType {
	FAMILY = 'family',
	KID12 = 'kid12',
	KID6 = 'kid6',
	ADULT = 'adult',
}

export const profileTypeLabels: Record<ProfileType, string> = {
	[ProfileType.FAMILY]: 'Сімейний',
	[ProfileType.KID12]: 'Дитина до 12 років',
	[ProfileType.KID6]: 'Дитина до 6 років',
	[ProfileType.ADULT]: 'Дорослий',
}

export interface IProfile extends IProfileGeneral {
	_id: string
}
