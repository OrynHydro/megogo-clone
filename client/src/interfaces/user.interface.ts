import { IProfile, IUserBase } from '../../../shared/interfaces/user.interface'

export interface IUser extends IUserBase {
	activeProfile?: IProfile
}
