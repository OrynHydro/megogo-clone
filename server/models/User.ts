import mongoose, { Document, Schema } from 'mongoose'
import { IUserBase } from '../../shared/interfaces/user.interface'

export interface IUser extends Document, IUserBase {}

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
	},
	{ timestamps: true, autoIndex: true }
)

export const UserModel = mongoose.model<IUser>('User', UserSchema)
