'use client'
import { FC, useEffect, useState } from 'react'
import s from './Profile-choose.module.scss'
import Image from 'next/image'
import Checkbox from '@/components/ui/Checkbox/Checkbox'
import { FieldApi, useForm } from '@tanstack/react-form'
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
import { MdOutlineCameraAlt } from 'react-icons/md'
import Carousel from './Carousel/Carousel'
import { AvatarCarousel } from '@/utils/avatar-carousels'
import TextInput from '@/components/ui/Text-input/Text-input'
import { useTextField } from '@/hooks/useTextField'

const ProfileChoose: FC = () => {
	const PF = process.env.NEXT_PUBLIC_FOLDER

	const router = useRouter()

	const { setActiveProfile } = useActions()

	const form = useForm({
		defaultValues: {
			profile: null as IProfile | null,
			profileType: null as ProfileType | null,
			rememberMe: false,
			avatar: 'user-img.jpg',
			username: '',
			isProfileExists: false,
		},
		// validators: {
		// 	onChange: profileChooseSchema,
		// },
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

	type FileFieldProps = {
		name: string
		setValue: (value: string) => void
		value?: string
	}

	const handleSetAvatar = (path: string) => {
		form.setFieldValue('avatar', path)
	}

	const handleSetFile = async (file: File, field: FileFieldProps) => {
		const formData = new FormData()
		formData.append('file', file as Blob)
		await axios.post('/api/upload', formData).then(res => {
			console.log(res.data)
			field.setValue(res.data)
		})
	}

	useEffect(() => {
		const originalBg = document.body.style.backgroundColor
		document.body.style.backgroundColor = '#fff'

		return () => {
			document.body.style.backgroundColor = originalBg
		}
	}, [])

	if (pageState.action === 'create' && pageState.step === 1) {
		return (
			<div className={s.container}>
				<div className={s.top}>
					<Image src={`${PF}/logo.svg`} alt='Logo' width={136} height={44} />
					<div
						className={s.cross}
						onClick={() => {
							setPageState({
								action: 'choose',
								type: null,
								step: 1,
							})
							form.reset()
						}}
					>
						<RxCross1 />
					</div>
				</div>
				<div className={s.mid}>
					<h1>Хто дивиметься?</h1>
					<div className={s.profiles} style={{ gap: '20px' }}>
						{pageState.type === 'all' && (
							<div
								onClick={() => {
									setPageState(prev => ({ ...prev, step: 2 }))
									form.setFieldValue('profileType', ProfileType.ADULT)
								}}
							>
								<ProfileNewItem type={ProfileType.ADULT} />
							</div>
						)}
						<div
							onClick={() => {
								setPageState(prev => ({ ...prev, step: 2 }))
								form.setFieldValue('profileType', ProfileType.KID6)
							}}
						>
							<ProfileNewItem type={ProfileType.KID6} />
						</div>
						<div
							onClick={() => {
								setPageState(prev => ({ ...prev, step: 2 }))
								form.setFieldValue('profileType', ProfileType.KID12)
							}}
						>
							<ProfileNewItem type={ProfileType.KID12} />
						</div>
					</div>
				</div>
				<div className={s.bot}>
					<span className={s.step}>Крок {pageState.step} з 3</span>
				</div>
			</div>
		)
	}

	if (pageState.action === 'create' && pageState.step === 2) {
		return (
			<div className={`${s.container} ${s.step2}`}>
				<div className={s.top}>
					<div
						className={s.cross}
						onClick={() => {
							setPageState({
								action: 'choose',
								type: null,
								step: 1,
							})
							form.reset()
						}}
					>
						<RxCross1 />
					</div>
				</div>
				<div className={s.titles}>
					<h1>Виберіть зображення профілю</h1>
					<h3>Завантажте фото або виберіть одне з доступних зображень нижче</h3>
				</div>
				<div className={s.mid}>
					<form className={s.left}>
						<form.Field name='avatar'>
							{field => (
								<div className={s.fieldContainer}>
									<label htmlFor='avatar'>
										<Image
											className={s.avatar}
											src={`${PF}storage/${field.state.value}`}
											width={256}
											height={256}
											alt=''
										/>
									</label>
									<input
										type='file'
										id='avatar'
										name='avatar'
										onChange={e => {
											if (e.target.files && e.target.files[0]) {
												handleSetFile(e.target.files[0], field)
											}
										}}
									/>
									<div className={s.textBlock}>
										<label htmlFor='avatar'>
											<MdOutlineCameraAlt />
											<span>Завантажити своє фото</span>
										</label>
										<p>Максимальний розмір файлу 1 MB</p>
									</div>
								</div>
							)}
						</form.Field>
					</form>
					<div className={s.right}>
						{AvatarCarousel.map((item, index) => (
							<Carousel key={index} slider={item} onClick={handleSetAvatar} />
						))}
					</div>
				</div>
				<div className={s.bot}>
					<div className={s.content}>
						<button
							className={s.prev}
							onClick={() => {
								setPageState(prev => ({
									...prev,
									step: 1,
								}))
								form.setFieldValue('avatar', 'user-img.jpg')
							}}
						>
							Назад
						</button>
						<span className={s.step}>Крок {pageState.step} з 3</span>
						<button
							className={s.next}
							onClick={() =>
								setPageState(prev => ({
									...prev,
									step: 3,
								}))
							}
						>
							Далі
						</button>
					</div>
				</div>
			</div>
		)
	}

	if (pageState.action === 'create' && pageState.step === 3) {
		return (
			<div className={s.container}>
				<div className={s.top}>
					<Image src={`${PF}/logo.svg`} alt='Logo' width={136} height={44} />
					<div
						className={s.cross}
						onClick={() => {
							setPageState({
								action: 'choose',
								type: null,
								step: 1,
							})
							form.reset()
						}}
					>
						<RxCross1 />
					</div>
				</div>
				<div className={s.mid}>
					<div className={s.titles}>
						<h1>Назвіть свій профіль</h1>
						<h3>Ім’я справжнє чи супергеройське — вибирати вам</h3>
					</div>
					<div className={s.content}>
						<Image
							src={`${PF}/storage/${form.state.values.avatar}`}
							alt=''
							width={220}
							height={220}
						/>
						<div className={s.inputBlock}>
							<form.Field
								name='username'
								validators={{
									onBlur: ({ value }) => {
										value.trim() === ''
											? form.state.fieldMeta.username.errors.push('ТЕСТ')
											: undefined
									},
								}}
							>
								{field => (
									<TextInput
										{...useTextField(field)}
										type='text'
										placeholder="Ім'я"
										maxLength={24}
										blur
									/>
								)}
							</form.Field>
						</div>
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
										form.setFieldValue('isProfileExists', true)
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
