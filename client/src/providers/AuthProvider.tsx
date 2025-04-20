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
					}
					return setLoading(false)
				}

				const [profileRes, userRes] = await Promise.allSettled([
					axios.get('/api/profiles/get-by-token'),
					axios.get('/api/users/get-by-token'),
				])

				const profileData =
					profileRes.status === 'fulfilled' ? profileRes.value.data : null
				const userData =
					userRes.status === 'fulfilled' ? userRes.value.data : null

				if (profileData) {
					const userToSet =
						userData ?? (await axios.post('/api/users/set-by-profile')).data

					setUser({
						phone: userToSet.phone,
						profiles: userToSet.profiles,
					})

					setActiveProfile({
						_id: profileData._id,
						type: profileData.type,
						name: profileData.name,
						megogoID: profileData.megogoID,
						avatar: profileData.avatar,
					})
				} else if (!userData && pathname !== '/') {
					setUser(null)
					setRedirecting(true)
					await router.push('/')
				} else if (userData) {
					setUser({
						phone: userData.phone,
						profiles: userData.profiles,
					})
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
