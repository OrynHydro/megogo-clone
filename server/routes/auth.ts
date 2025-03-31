import { Request, Response, Router } from 'express'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const router = Router()

const secretKeyAccess = process.env.JWT_SECRET_ACCESS!
const secretKeyRefresh = process.env.JWT_SECRET_REFRESH!

router.post('/register', async (req: Request, res: Response) => {
	try {
		const phone = req.body.phone
		const rememberMe = req.body.rememberMe

		const lastUser = await User.findOne().sort('-megogoID')
		const newMegogoID = lastUser ? lastUser.megogoID + 1 : 1

		const newUser = new User({
			phone: phone,
			megogoID: newMegogoID,
		})
		const user = await newUser.save()

		const accessToken = jwt.sign({ userId: user._id }, secretKeyAccess, {
			expiresIn: '1h',
		})

		res.cookie('accessToken', accessToken, {
			httpOnly: true,
		})

		if (rememberMe) {
			const refreshToken = jwt.sign({ userId: user._id }, secretKeyRefresh, {
				expiresIn: '14d',
			})

			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
			})
		}

		res.status(200).json(user)
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Server error' })
	}
})

export default router
