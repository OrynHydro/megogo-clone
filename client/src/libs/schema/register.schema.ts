import { z } from 'zod'

export const registerSchema = z
	.object({
		phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Некоректний номер телефону'),
		rememberMe: z.boolean(),
		code: z.number(),
		verificationCode: z.number(),
	})
	.refine(data => data.code === data.verificationCode, {
		message: 'Код не співпадає',
		path: ['code'],
	})
