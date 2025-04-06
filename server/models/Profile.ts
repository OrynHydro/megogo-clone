import mongoose from 'mongoose'

export interface IProfileBase {
	_id: mongoose.Types.ObjectId
}

export const ProfileSchema = new mongoose.Schema({
	name: { type: String, required: true },
	type: {
		type: String,
		enum: ['family', 'child', 'kid', 'adult'],
		default: 'family',
	},
	avatar: { type: String, required: true },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
})

const ProfileModel = mongoose.model<IProfileBase>('Profile', ProfileSchema)
export default ProfileModel
