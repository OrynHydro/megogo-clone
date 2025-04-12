import { Request, Response, Router } from 'express'
import User from '../models/User'
import Profile from '../models/Profile'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const router = Router()

const secretKeyAccess = process.env.JWT_SECRET_ACCESS!
const secretKeyRefresh = process.env.JWT_SECRET_REFRESH!

router.post('/', async (req: Request, res: Response) => {
	try {
		const { phone, rememberMe } = req.body

		let user = await User.findOne({ phone })

		if (!user) {
			const lastProfile = await Profile.findOne().sort('-megogoID')
			const newMegogoID = lastProfile ? lastProfile.megogoID + 1 : 1

			user = await User.create({
				phone,
			})

			const profile = await Profile.create({
				name: 'User',
				type: 'family',
				megogoID: newMegogoID,
				avatar: '/user-img.jpg',
				user: user._id,
			})

			user.profiles.push(profile)
			await user.save()
		}

		const accessToken = jwt.sign({ userId: user._id }, secretKeyAccess, {
			expiresIn: '1h',
		})

		res.cookie('accessToken', accessToken, {
			httpOnly: true,
			maxAge: 60 * 60 * 1000,
		})

		if (rememberMe) {
			const refreshToken = jwt.sign({ userId: user._id }, secretKeyRefresh, {
				expiresIn: '14d',
			})
			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				maxAge: 14 * 24 * 60 * 60 * 1000,
			})
		}

		res.status(200).json(user)
	} catch (error) {
		console.error('Auth error:', error)
		res.status(500).json({ message: 'Server error' })
	}
})

export default router
