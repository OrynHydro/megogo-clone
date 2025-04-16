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
import { redirect, usePathname, useRouter } from 'next/navigation'
import ProfileChoose from '@/components/screens/Profile-choose.tsx/Profile-choose'
import { IProfile } from '@/interfaces/profile.interface'

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [loading, setLoading] = useState<boolean>(true)
	const { user, activeProfile } = useAuth()
	const { setUser, setActiveProfile } = useActions()
	const router = useRouter()
	const pathname = usePathname()

	useEffect(() => {
		const checkAuth = async () => {
			try {
				if (user) {
					if (!activeProfile && pathname !== '/profile-choose') {
						router.push('/profile-choose')
					}
					return
				}

				const profileRes = await axios.get('/api/profiles/get-by-token')
				const profileData = profileRes.data

				if (profileData) {
					const userRes = await axios.get('/api/users/get-by-token')
					const userData = userRes.data as IUser

					setActiveProfile({
						_id: profileData._id,
						type: profileData.type,
						name: profileData.name,
						megogoID: profileData.megogoID,
						avatar: profileData.avatar,
					} as IProfile)

					if (userData) {
						setUser({
							phone: userData.phone,
							profiles: userData.profiles,
						} as IUser)
					} else {
						setUser(null)
					}

					return
				}

				const userRes = await axios.get('/api/users/get-by-token')
				const userData = userRes.data as IUser

				if (!userData) {
					setUser(null)
					return
				}

				if (
					userData.profiles.length === 1 &&
					userData.profiles[0].type === 'family'
				) {
					router.push('/profile-choose')
				}

				setUser({
					phone: userData.phone,
					profiles: userData.profiles,
				} as IUser)
			} catch (error) {
				console.error('Auth check failed:', error)
				setUser(null)
			} finally {
				setLoading(false)
			}
		}

		checkAuth()
	}, [user, activeProfile, pathname, setUser])

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
