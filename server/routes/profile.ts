import { Router, Request, Response } from 'express'
import User, { IUser } from '../models/User'
import Profile, { IProfileBase } from '../models/Profile'
import dotenv from 'dotenv'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { ProfileType } from '../../client/src/interfaces/profile.interface'
import { IProfileGeneral } from '@shared/interfaces/profile.interface'

dotenv.config({ path: '.env.local' })
const router = Router()

const secretKeyAccess = process.env.JWT_SECRET_ACCESS!
const secretKeyRefresh = process.env.JWT_SECRET_REFRESH!

interface IUserWithPopulatedProfiles extends IUser {
	profiles: IProfileGeneral[]
}

router.post('/create-profile', async (req: Request, res: Response) => {
	try {
		const { profileType, username, avatar, user } = req.body

		if (!Object.values(ProfileType).includes(profileType)) {
			return res.status(400).json({ message: 'Invalid profileType value' })
		}

		const lastProfile = await Profile.findOne().sort('-megogoID')
		const newMegogoID = lastProfile ? lastProfile.megogoID + 1 : 1

		const users = await User.find({ phone: user.phone }).populate('profiles')
		const dbUser = users[0] as IUserWithPopulatedProfiles

		if (!dbUser) {
			return res.status(404).json({ message: 'User not found' })
		}

		const profile = new Profile({
			name: username,
			type: profileType,
			avatar: avatar,
			user: dbUser._id,
			megogoID: newMegogoID,
		})

		await profile.save()

		dbUser.profiles.push(profile._id as IProfileBase)

		await dbUser.save()

		res.status(200).json(dbUser)
	} catch (err) {
		console.error('Error creating profile:', err)
		res.status(500).json({ message: 'Internal server error' })
	}
})

router.post('/set-profile', async (req: Request, res: Response) => {
	try {
		const { profile, rememberMe: clientRememberMe } = req.body

		const hasRefreshToken = Boolean(req.cookies?.refreshProfileToken)
		const rememberMe = hasRefreshToken || clientRememberMe

		const accessProfileToken = jwt.sign(
			{ profileId: profile._id },
			secretKeyAccess,
			{ expiresIn: '1h' }
		)

		res.cookie('accessProfileToken', accessProfileToken, {
			httpOnly: true,
			maxAge: 60 * 60 * 1000,
		})

		if (rememberMe) {
			const refreshProfileToken = jwt.sign(
				{ profileId: profile._id },
				secretKeyRefresh,
				{ expiresIn: '14d' }
			)
			res.cookie('refreshProfileToken', refreshProfileToken, {
				httpOnly: true,
				maxAge: 14 * 24 * 60 * 60 * 1000,
			})
		}

		res.status(200).json(profile)
	} catch (error) {
		console.error('Error setting active profile:', error)
		res.status(500).json({ message: 'Internal server error' })
	}
})

router.get('/get-by-token', async (req: Request, res: Response) => {
	const accessProfileToken = req.cookies['accessProfileToken']
	const refreshProfileToken = req.cookies['refreshProfileToken']

	try {
		const decodedAccessToken = jwt.verify(
			accessProfileToken,
			secretKeyAccess
		) as JwtPayload

		if (!decodedAccessToken || !decodedAccessToken.profileId) {
			res.status(200).json(null)
		}

		const dbProfile = await Profile.findById(
			decodedAccessToken.profileId
		).populate({
			path: 'user',
			populate: { path: 'profiles' },
		})
		res.status(200).json(dbProfile)
	} catch (accessTokenError) {
		try {
			const decodedRefreshToken = jwt.verify(
				refreshProfileToken,
				secretKeyRefresh
			) as JwtPayload

			if (!decodedRefreshToken || !decodedRefreshToken.profileId) {
				res.status(200).json(null)
			}

			const newAccessToken = jwt.sign(
				{ profileId: decodedRefreshToken.profileId },
				secretKeyAccess,
				{ expiresIn: '1h' }
			)

			res.cookie('accessProfileToken', newAccessToken, {
				httpOnly: true,
				maxAge: 60 * 60 * 1000,
			})

			const dbProfile = await Profile.findById(
				decodedRefreshToken.profileId
			).populate({
				path: 'user',
				populate: { path: 'profiles' },
			})

			res.status(200).json(dbProfile)
		} catch (refreshTokenError) {
			res.status(200).json(null)
		}
	}
})

router.put('/edit-profile/:profileId', async (req: Request, res: Response) => {
	try {
		const { username, avatar } = req.body

		const updatedProfile = await Profile.findByIdAndUpdate(
			req.params.profileId,
			{ name: username, avatar: avatar },
			{ new: true }
		)

		if (!updatedProfile) {
			return res.status(404).json({ message: 'Profile not found' })
		}

		res.status(200).json(updatedProfile)
	} catch (error) {
		console.error('Error updating profile:', error)
		res.status(500).json({ message: 'Internal server error' })
	}
})

export default router
