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

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [loading, setLoading] = useState<boolean>(true)
	const user = useAuth()
	const { setUser } = useActions()

	useEffect(() => {
		const checkAuth = async () => {
			try {
				if (user) return

				const { data } = await axios.get('/api/users/get-by-token')
				if (!data) {
					setUser(null)
					return
				}

				setUser({
					phone: data.phone,
					megogoID: data.megogoID,
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
