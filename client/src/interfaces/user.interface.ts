import { IUserBase } from '@shared/interfaces/user.interface'
import { IProfile } from './profile.interface'

export interface IUser extends IUserBase {
	profiles: IProfile[]
}
