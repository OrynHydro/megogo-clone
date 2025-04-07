import mongoose, { Document } from 'mongoose'
import { IProfileGeneral } from '../../shared/interfaces/profile.interface'

interface IProfileBase extends IProfileGeneral, Document {}

export const ProfileSchema = new mongoose.Schema({
	name: { type: String, required: true },
	type: {
		type: String,
		enum: ['family', 'child', 'kid', 'adult'],
		default: 'family',
	},
	avatar: { type: String, required: true },
	megogoID: {
		type: Number,
		unique: true,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
})

const ProfileModel = mongoose.model<IProfileBase>('Profile', ProfileSchema)
export default ProfileModel
