import { useTypedSelector } from './useTypedSelector'
import { IUser } from '@/interfaces/user.interface'
import { IProfile } from '@/interfaces/profile.interface'

interface UseAuthReturn {
	user?: IUser | null
	activeProfile?: IProfile | null
}

export const useAuth = (): UseAuthReturn => {
	const { data, activeProfile } = useTypedSelector(state => state.user)

	return {
		user: data,
		activeProfile,
	}
}
