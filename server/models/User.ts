import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
	phone: string
	megogoID: number
}

const UserSchema: Schema = new mongoose.Schema(
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

const UserModel = mongoose.model<IUser>('User', UserSchema)
export default UserModel
