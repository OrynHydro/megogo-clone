import { IProfileBase } from '@shared/interfaces/profile.interface'

export enum ProfileType {
	FAMILY = 'family',
	KID12 = 'kid12',
	KID6 = 'kid6',
	ADULT = 'adult',
}

export interface IProfile extends IProfileBase {}
