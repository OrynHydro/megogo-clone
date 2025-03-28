import { Request, Response, Router } from 'express'
import twilio from 'twilio'
import { GenerateCode } from '../middleware/generate-code'

const router = Router()

router.post('/', async (req: Request, res: Response) => {
	try {
		const accountSid = process.env.TWILIO_ACCOUNT_SID
		const authToken = process.env.TWILIO_AUTH_TOKEN
		const phoneNumber = process.env.TWILIO_PHONE_NUMBER
		const client = twilio(accountSid, authToken)

		const number = req.body.number

		await client.messages.create({
			body: `Ваш код для реєстрації: ${GenerateCode(6)}`,
			from: phoneNumber,
			to: number,
		})

		console.log('SMS sent successfully')
		res.status(200).send('SMS sent successfully')
	} catch (error) {
		console.error('Error sending SMS:', error)
		res.status(500).send('Error sending SMS')
	}
})

export default router
