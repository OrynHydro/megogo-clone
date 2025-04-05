export enum ProfileType {
	FAMILY = 'family',
	KID12 = 'kid12',
	KID6 = 'kid6',
	ADULT = 'adult',
}

export const profileTypeLabels: Record<ProfileType, string> = {
	[ProfileType.FAMILY]: 'Сімейний',
	[ProfileType.KID12]: 'KIDS',
	[ProfileType.KID6]: 'KIDS',
	[ProfileType.ADULT]: 'Дорослий',
}

export interface IProfile {
	name: string
	type: ProfileType
	avatar: string | null
}

export interface IUserBase {
	phone: string
	megogoID: number
	profiles: IProfile[]
}
