import mongoose, { Document, Schema } from 'mongoose'
import { IUserBase } from '@shared/interfaces/user.interface'
import { ProfileSchema } from './Profile'

export interface IUser extends Document, IUserBase {}

// const ProfileSchema = new mongoose.Schema(
// 	{
// 		name: { type: String, required: true },
// 		type: {
// 			type: String,
// 			enum: ['family', 'child', 'kid', 'adult'],
// 			default: 'family',
// 		},
// 		avatar: { type: String, required: true },
// 	},
// 	{ _id: false }
// )

const UserSchema: Schema = new mongoose.Schema<IUser>(
	{
		phone: {
			type: String,
			required: true,
			unique: true,
		},
		megogoID: {
			type: Number,
			unique: true,
			required: true,
		},
		profiles: [ProfileSchema],
	},
	{ timestamps: true, autoIndex: true }
)

const UserModel = mongoose.model<IUser>('User', UserSchema)
export default UserModel
