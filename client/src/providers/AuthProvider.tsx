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
import { IProfile } from '@/interfaces/profile.interface'

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [loading, setLoading] = useState<boolean>(true)
	const [redirecting, setRedirecting] = useState<boolean>(false)
	const { user, activeProfile } = useAuth()
	const { setUser, setActiveProfile } = useActions()
	const router = useRouter()
	const pathname = usePathname()

	useEffect(() => {
		const checkAuth = async () => {
			try {
				if (user) {
					if (!activeProfile && pathname !== '/profile-choose') {
						setRedirecting(true)
						await router.push('/profile-choose')
						return
					}
					setLoading(false)
					return
				}

				const profileRes = await axios.get('/api/profiles/get-by-token')
				const profileData = profileRes.data

				if (profileData) {
					const userRes = await axios.get('/api/users/get-by-token')
					const userData = userRes.data as IUser

					if (!userData) {
						const newUser = await axios.post('/api/users/set-by-profile')
						setUser({
							phone: newUser.data.phone,
							profiles: newUser.data.profiles,
						} as IUser)
					} else {
						setUser({
							phone: userData.phone,
							profiles: userData.profiles,
						} as IUser)
					}

					setActiveProfile({
						_id: profileData._id,
						type: profileData.type,
						name: profileData.name,
						megogoID: profileData.megogoID,
						avatar: profileData.avatar,
					} as IProfile)
					return
				}

				const userRes = await axios.get('/api/users/get-by-token')
				const userData = userRes.data as IUser

				if (!userData && pathname !== '/') {
					setUser(null)
					setRedirecting(true)
					await router.push('/')
				} else if (userData) {
					setUser({
						phone: userData.phone,
						profiles: userData.profiles,
					} as IUser)
				}
			} catch (error) {
				console.error('Auth check failed:', error)
				setUser(null)
			} finally {
				if (!redirecting) {
					setLoading(false)
				}
			}
		}

		void checkAuth()
	}, [
		user,
		activeProfile,
		pathname,
		setUser,
		setActiveProfile,
		router,
		redirecting,
	])

	// useEffect(() => {
	// 	if (
	// 		redirecting &&
	// 		((user && !activeProfile && pathname === '/profile-choose') ||
	// 			(!user && pathname === '/'))
	// 	) {
	// 		setRedirecting(false)
	// 		setLoading(false)
	// 		console.log('Navigation completed')
	// 	}
	// }, [pathname, redirecting, user, activeProfile])

	if (loading || redirecting) {
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
