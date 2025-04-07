import { ProfileType } from '../../client/src/interfaces/profile.interface'
export interface IProfileGeneral {
	name: string
	type: ProfileType
	megogoID: number
	avatar: string | null
}
