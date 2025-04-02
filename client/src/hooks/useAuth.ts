import { IUser } from '@/interfaces/user.interface'
import { useTypedSelector } from './useTypedSelector'

interface AuthResponse {
	user: IUser | null
}

export const useAuth = () => {
	const authResponse = useTypedSelector(state => state.user) as AuthResponse

	if (authResponse.user) {
		return authResponse.user
	}

	return null
}
