import { Router, Request, Response } from 'express'
import User from '../models/User'
import Profile from '../models/Profile'
import dotenv from 'dotenv'
import jwt, { JwtPayload } from 'jsonwebtoken'

dotenv.config({ path: '.env.local' })
const router = Router()

const secretKeyAccess = process.env.JWT_SECRET_ACCESS!
const secretKeyRefresh = process.env.JWT_SECRET_REFRESH!

router.post('/create-profile', async (req: Request, res: Response) => {
	try {
	} catch (err) {
		console.error('Error creating profile:', err)
		res.status(500).json({ message: 'Internal server error' })
	}
})

router.post('/set-profile', async (req: Request, res: Response) => {
	try {
		const { profile, rememberMe } = req.body

		const accessProfileToken = jwt.sign(
			{ profileId: profile._id },
			secretKeyAccess,
			{
				expiresIn: '1h',
			}
		)

		res.cookie('accessProfileToken', accessProfileToken, {
			httpOnly: true,
			maxAge: 60 * 60 * 1000,
		})

		if (rememberMe) {
			const refreshProfileToken = jwt.sign(
				{ profileId: profile._id },
				secretKeyRefresh,
				{
					expiresIn: '14d',
				}
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
		).populate('user')
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
				decodedRefreshToken._id
			).populate('user')
			res.status(200).json(dbProfile)
		} catch (refreshTokenError) {
			res.status(200).json(null)
		}
	}
})

export default router
