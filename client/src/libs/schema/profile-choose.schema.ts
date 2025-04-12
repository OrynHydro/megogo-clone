import { IProfile, ProfileType } from '@/interfaces/profile.interface'
import { z } from 'zod'

// export const profileChooseSchema = z
// 	.object({
// 		profile: z.custom<IProfile | null>(),
// 		profileType: z.nativeEnum(ProfileType).nullable(),
// 		rememberMe: z.boolean(),
// 		avatar: z.string(),
// 		username: z.string(),
// 		isProfileExists: z.boolean(),
// 	})
// 	.refine(
// 		data => {
// 			// Если профиль не существует (isProfileExists === false), то имя пользователя должно быть заполнено
// 			if (data.isProfileExists === false) {
// 				return data.username !== undefined && data.username.length > 0
// 			}
// 			return true // Если профиль существует, пропускаем проверку
// 		},
// 		{
// 			message: "Будь ласка, введіть ім'я профілю",
// 			path: ['username'],
// 		}
// 	)
