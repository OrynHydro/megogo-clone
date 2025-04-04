'use client'
import { useAuth } from '@/hooks/useAuth'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { IUser } from '@/interfaces/user.interface'
import axios from 'axios'
import { useActions } from '@/hooks/useActions'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import s from './AuthProvider.module.scss'
import { usePathname, useRouter } from 'next/navigation'
import ProfileChoose from '@/components/screens/Profile-choose.tsx/Profile-choose'

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [loading, setLoading] = useState<boolean>(true)
	const user = useAuth()
	const { setUser } = useActions()
	const router = useRouter()
	const pathname = usePathname()

	useEffect(() => {
		const checkAuth = async () => {
			try {
				if (user) return

				const { data } = await axios.get('/api/users/get-by-token')
				if (!data) {
					setUser(null)
					return
				}

				if (data.profiles.length === 1 && data.profiles[0].type === 'family') {
					router.push('/profile-choose')
				}

				setUser({
					phone: data.phone,
					megogoID: data.megogoID,
					profiles: data.profiles,
				} as IUser)
			} catch (error) {
				console.error('Auth check failed:', error)
				setUser(null)
			} finally {
				setLoading(false)
			}
		}

		checkAuth()
	}, [user, setUser])

	if (pathname === '/profile-choose' && user) {
		return <ProfileChoose />
	}

	if (loading) {
		return (
			<div className={s.loading}>
				<DotLottieReact
					src='https://lottie.host/a8710c8e-3abc-4aa1-994f-0f2a510f4389/BLJSFDrRBv.lottie'
					loop
					autoplay
				/>
			</div>
		)
	}
	return <>{children}</>
}

export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Provider store={store}>
			<AuthProvider>{children}</AuthProvider>
		</Provider>
	)
}
