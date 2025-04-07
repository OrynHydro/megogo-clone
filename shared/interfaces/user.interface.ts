import { IProfile } from '@/interfaces/profile.interface'

export interface IUserBase {
	phone: string
	profiles: IProfile[]
}
