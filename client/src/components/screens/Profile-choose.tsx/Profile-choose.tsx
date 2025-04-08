'use client'
import { FC, useState } from 'react'
import s from './Profile-choose.module.scss'
import Image from 'next/image'
import Checkbox from '@/components/ui/Checkbox/Checkbox'
import { useForm } from '@tanstack/react-form'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import ProfileItem from './Profile-item/Profile-item'
import { IProfile, ProfileType } from '@/interfaces/profile.interface'
import { useAuth } from '@/hooks/useAuth'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { IUser } from '@/interfaces/user.interface'
import { useActions } from '@/hooks/useActions'
import { RxCross1 } from 'react-icons/rx'
import ProfileNewItem from './Profile-new-item/Profile-new-item'

const ProfileChoose: FC = () => {
	const PF = process.env.NEXT_PUBLIC_FOLDER

	const router = useRouter()

	const { setActiveProfile } = useActions()

	const form = useForm({
		defaultValues: {
			profile: null as IProfile | null,
			rememberMe: false,
		},
		onSubmit: async ({ value }) => {
			if (!value.profile) return

			const { profile, rememberMe } = value
			const { data } = await axios.post('/api/profiles/set-profile', {
				profile: profile,
				rememberMe: rememberMe,
			})

			setActiveProfile(profile)

			if (data) {
				router.push('/')
			}
		},
	})

	const [pageState, setPageState] = useState<{
		action: 'choose' | 'create'
		type: 'all' | 'kid' | null
		step: number
	}>({
		action: 'choose',
		type: null,
		step: 1,
	})

	const { user } = useAuth()

	const [file, setFile] = useState<File | null>(null)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log('rredf')
		const formData = new FormData(e.currentTarget)
		formData.append('inputName', 'sampleFile')
		formData.append('file', file as Blob)

		await axios.post('/api/upload', formData).then(res => console.log(res.data))
	}

	if (pageState.action === 'create') {
		return (
			<div className={s.container}>
				<div className={s.top}>
					<Image src={`${PF}/logo.svg`} alt='Logo' width={136} height={44} />
					<div
						className={s.cross}
						onClick={() =>
							setPageState({
								action: 'choose',
								type: null,
								step: 1,
							})
						}
					>
						<RxCross1 />
					</div>
				</div>
				<div className={s.mid}>
					<h1>Хто дивиметься?</h1>
					<div className={s.profiles} style={{ gap: '20px' }}>
						{pageState.type === 'all' && (
							<ProfileNewItem type={ProfileType.ADULT} />
						)}
						<ProfileNewItem type={ProfileType.KID6} />
						<ProfileNewItem type={ProfileType.KID12} />
						<form
							id='uploadForm'
							method='post'
							encType='multipart/form-data'
							onSubmit={e => handleSubmit(e)}
						>
							<input
								type='file'
								name='sampleFile'
								onChange={e => {
									if (e.target.files && e.target.files[0]) {
										setFile(e.target.files[0])
									}
								}}
							/>
							<input type='submit' value='Upload!' />
						</form>
					</div>
				</div>
				<div className={s.bot}>
					<span className={s.step}>Крок {pageState.step} з 3</span>
				</div>
			</div>
		)
	}

	return (
		<div className={s.container}>
			<div className={s.top}>
				<Image src={`${PF}/logo.svg`} alt='Logo' width={136} height={44} />
				<span className={s.change}>Редагувати профілі</span>
			</div>
			<div className={s.mid}>
				<h1>Хто дивиться?</h1>

				{user?.profiles.length === 1 && user?.profiles[0].type === 'family' && (
					<div className={s.profiles}>
						<form.Field name='profile'>
							{field => (
								<div
									onClick={() => {
										field.setValue(user.profiles[0])
										form.handleSubmit()
									}}
								>
									<ProfileItem user={user} profile={user.profiles[0]} />
								</div>
							)}
						</form.Field>

						<div
							onClick={() =>
								setPageState({
									action: 'create',
									type: 'kid',
									step: 1,
								})
							}
						>
							<ProfileItem
								user={user}
								profile={{
									name: 'Додати дитячий',
									type: ProfileType.KID12,
									megogoID: 0,
									avatar: null,
								}}
							/>
						</div>

						<div
							onClick={() =>
								setPageState({
									action: 'create',
									type: 'all',
									step: 1,
								})
							}
						>
							<ProfileItem
								user={user}
								profile={{
									name: 'Додати профіль',
									type: ProfileType.FAMILY,
									megogoID: 0,
									avatar: null,
								}}
							/>
						</div>
					</div>
				)}
			</div>
			<div className={s.bot}>
				<div className={s.checkboxBlock}>
					<form.Field name='rememberMe'>
						{field => (
							<Checkbox
								field={field}
								label="Запам'ятати мій вибір профілю на цьому пристрої"
								color='linear-gradient(98deg,#227fc3 6.24%,#22c3b1 79.75%,#22c3b1 98.79%)'
							/>
						)}
					</form.Field>
				</div>
				<div className={s.hint}>
					<span>
						Тільки ви користуєтеся цим пристроєм? Встановіть автоматичний вхід і
						ми запам'ятаємо обраний профіль під час наступного входу.
					</span>
				</div>
			</div>
		</div>
	)
}

export default ProfileChoose
