import { Router, Request, Response } from 'express'
import User from '../models/User'
import dotenv from 'dotenv'
import jwt, { JwtPayload } from 'jsonwebtoken'

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
		console.log(dbUser)
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

			res.cookie('accessToken', newAccessToken, { httpOnly: true })

			const dbUser = await User.findById(decodedRefreshToken.userId)
			res.status(200).json(dbUser)
		} catch (refreshTokenError) {
			res.status(200).json(null)
		}
	}
})

export default router
