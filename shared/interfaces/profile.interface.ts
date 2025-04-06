import { ProfileType } from '../../client/src/interfaces/profile.interface'
export interface IProfileBase {
	name: string
	type: ProfileType
	avatar: string | null
}
