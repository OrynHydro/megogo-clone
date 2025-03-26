import { z } from 'zod'

export const registerSchema = z.object({
	phone: z.string(),
})
