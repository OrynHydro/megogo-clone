import { Router, Request, Response } from 'express'
import User, { IUser } from '../models/User'
import Profile from '../models/Profile'
import dotenv from 'dotenv'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { IProfileBase } from './../models/Profile'
import { HydratedDocument } from 'mongoose'

dotenv.config({ path: '.env.local' })
const router = Router()

const secretKeyAccess = process.env.JWT_SECRET_ACCESS!
const secretKeyRefresh = process.env.JWT_SECRET_REFRESH!

router.get('/get-by-token', async (req: Request, res: Response) => {
	const accessToken = req.cookies['accessToken']
	const refreshToken = req.cookies['refreshToken']

	try {
		const decodedAccessToken = jwt.verify(
			accessToken,
			secretKeyAccess
		) as JwtPayload

		if (!decodedAccessToken || !decodedAccessToken.userId) {
			res.status(200).json(null)
		}

		const dbUser = await User.findById(decodedAccessToken.userId).populate(
			'profiles'
		)
		res.status(200).json(dbUser)
	} catch (accessTokenError) {
		try {
			const decodedRefreshToken = jwt.verify(
				refreshToken,
				secretKeyRefresh
			) as JwtPayload

			if (!decodedRefreshToken || !decodedRefreshToken.userId) {
				res.status(200).json(null)
			}

			const newAccessToken = jwt.sign(
				{ userId: decodedRefreshToken.userId },
				secretKeyAccess,
				{ expiresIn: '1h' }
			)

			res.cookie('accessToken', newAccessToken, {
				httpOnly: true,
				maxAge: 60 * 60 * 1000,
			})

			const dbUser = await User.findById(decodedRefreshToken.userId).populate(
				'profiles'
			)
			res.status(200).json(dbUser)
		} catch (refreshTokenError) {
			res.status(200).json(null)
		}
	}
})

router.post('/set-by-profile', async (req: Request, res: Response) => {
	const accessProfileToken = req.cookies['accessProfileToken']
	const refreshProfileToken = req.cookies['refreshProfileToken']
	try {
		const decodedAccessProfileToken = jwt.verify(
			accessProfileToken,
			secretKeyAccess
		) as JwtPayload

		if (!decodedAccessProfileToken || !decodedAccessProfileToken.profileId) {
			res.status(200).json(null)
		}

		const dbProfile = (await Profile.findById(
			decodedAccessProfileToken.profileId
		).populate({
			path: 'user',
			populate: {
				path: 'profiles',
			},
		})) as HydratedDocument<IProfileBase> & {
			user: IUser
		}

		if (!dbProfile) {
			res.status(200).json(null)
		}

		if (refreshProfileToken) {
			const newRefreshToken = jwt.sign(
				{ userId: dbProfile.user._id },
				secretKeyRefresh,
				{ expiresIn: '14d' }
			)

			res.cookie('refreshToken', newRefreshToken, {
				httpOnly: true,
				maxAge: 14 * 24 * 60 * 60 * 1000,
			})
		}
		const newAccessToken = jwt.sign(
			{ userId: dbProfile.user._id },
			secretKeyAccess,
			{ expiresIn: '1h' }
		)

		res.cookie('accessToken', newAccessToken, {
			httpOnly: true,
			maxAge: 60 * 60 * 1000,
		})

		res.status(200).json(dbProfile.user)
	} catch (error) {
		res.status(200).json(null)
	}
})

router.post('/logout', async (req: Request, res: Response) => {
	try {
		res.clearCookie('accessToken')
		res.clearCookie('refreshToken')
		res.clearCookie('accessProfileToken')
		res.clearCookie('refreshProfileToken')
		res.status(200).json(null)
	} catch (error) {
		console.error('Logout error:', error)
		res.status(500).json({ error: 'Logout error' })
	}
})

export default router
