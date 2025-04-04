export enum ProfileType {
	FAMILY = 'family',
	CHILD = 'child',
	KID = 'kid',
	ADULT = 'adult',
}

export interface IProfile {
	name: string
	type: ProfileType
	avatar: string
}

export interface IUserBase {
	phone: string
	megogoID: number
	profiles: IProfile[]
}
