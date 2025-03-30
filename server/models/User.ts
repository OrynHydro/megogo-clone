import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
	MegogoID: number
	phone: string
}

const UserSchema: Schema = new mongoose.Schema(
	{
		MegogoID: {
			type: Number,
			unique: true,
		},
		phone: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true }
)

const UserModel = mongoose.model<IUser>('User', UserSchema)
export default UserModel
