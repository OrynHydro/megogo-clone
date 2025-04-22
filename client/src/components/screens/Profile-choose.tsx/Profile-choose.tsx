'use client'
import { FC, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
	useParams,
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'
import axios from 'axios'
import { RxCross1 } from 'react-icons/rx'
import { MdOutlineCameraAlt } from 'react-icons/md'
import { useForm } from '@tanstack/react-form'

import s from './Profile-choose.module.scss'
import Checkbox from '@/components/ui/Checkbox/Checkbox'
import TextInput from '@/components/ui/Text-input/Text-input'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useAuth } from '@/hooks/useAuth'
import { useActions } from '@/hooks/useActions'
import { useInput } from '@/hooks/useInput'

import ProfileItem from './Profile-item/Profile-item'
import ProfileNewItem from './Profile-new-item/Profile-new-item'
import Carousel from './Carousel/Carousel'
import { AvatarCarousel } from '@/utils/avatar-carousels'
import {
	IProfile,
	ProfileType,
	profileTypeLabels,
} from '@/interfaces/profile.interface'
import { IUser } from '@/interfaces/user.interface'

const ProfileChoose: FC = () => {
	const PF = process.env.NEXT_PUBLIC_FOLDER
	const { user } = useAuth()
	const { setActiveProfile, setUser } = useActions()
	const router = useRouter()

	const [step, setStep] = useState(0)
	const [action, setAction] = useState<'choose' | 'create' | 'edit' | 'delete'>(
		'choose'
	)
	const [pageType, setPageType] = useState<'all' | 'kid' | null>(null)

	const form = useForm({
		defaultValues: {
			profile: null as IProfile | null,
			profileType: null as ProfileType | null,
			rememberMe: false,
			avatar: 'user-img.jpg',
			username: '',
			isProfileExists: false,
		},
		onSubmit: async ({ value }) => {
			if (action === 'create') {
				if (!value.profileType) return
				const { profileType, username, avatar } = value
				const { data } = await axios.post('/api/profiles/create-profile', {
					profileType:
						ProfileType[profileType.toUpperCase() as keyof typeof ProfileType],
					username,
					avatar,
					user: user,
				})

				if (data) {
					setUser(data)
					document.location.reload()
				}
				return
			} else if (action === 'choose') {
				const { profile, rememberMe } = value
				const { data } = await axios.post('/api/profiles/set-profile', {
					profile,
					rememberMe,
				})
				setActiveProfile(profile)
				if (data) router.push('/')
			} else if (action === 'edit' && value.profile) {
				const [avatar, username] = [
					value.avatar !== value.profile?.avatar && initializedAvatar.current
						? value.avatar
						: value.profile?.avatar,
					value.username !== value.profile?.name
						? value.username
						: value.profile?.name,
				]
				await axios.put(`/api/profiles/edit-profile/${value.profile?._id}`, {
					avatar,
					username,
				})
				if (!user) return
				const updatedUser: IUser = {
					...user,
					profiles: user.profiles.map(profile =>
						profile._id === value.profile?._id
							? { ...profile, avatar, name: username }
							: profile
					),
				}
				initializedAvatar.current = false
				setUser(updatedUser)
				setAction('choose')
				setStep(0)
				form.reset()
			} else if (action === 'delete' && value.profile) {
				await axios.delete(`/api/profiles/delete-profile/${value.profile?._id}`)
				if (!user) return

				const profileId = user.profiles.indexOf(
					user.profiles.find(profile => profile._id === value.profile!._id)!
				)

				const updatedUser: IUser = {
					...user,
					profiles: user.profiles.filter((_, index) => index !== profileId),
				}
				initializedAvatar.current = false
				setUser(updatedUser)
				setAction('choose')
				setStep(0)
				form.reset()
			}
		},
	})

	const uploadFile = async (file: File, setValue: (value: string) => void) => {
		const formData = new FormData()
		formData.append('file', file)
		const res = await axios.post('/api/upload', formData)
		setValue(`storage/${res.data}`)
	}

	useEffect(() => {
		const original = document.body.style.backgroundColor
		document.body.style.backgroundColor = '#fff'
		return () => {
			document.body.style.backgroundColor = original
		}
	}, [])

	const resetCreate = () => {
		const remember = form.getFieldValue('rememberMe')
		form.reset()
		form.setFieldValue('rememberMe', remember)
		setAction('choose')
		setStep(0)
	}

	const renderStep1 = () => (
		<div className={s.container}>
			<div className={s.top}>
				<Image src={`${PF}/logo.svg`} alt='Logo' width={136} height={44} />
				<div className={s.cross} onClick={resetCreate}>
					<RxCross1 />
				</div>
			</div>
			<div className={s.mid}>
				<h1>Хто дивиметься?</h1>
				<div className={s.profiles} style={{ gap: '20px' }}>
					{[...(pageType === 'all' ? ['ADULT'] : []), 'KID6', 'KID12'].map(
						type => (
							<div
								key={type}
								onClick={() => {
									const selectedType =
										ProfileType[type as keyof typeof ProfileType]
									setStep(2)
									form.setFieldValue('profileType', selectedType)
								}}
							>
								<ProfileNewItem
									type={ProfileType[type as keyof typeof ProfileType]}
								/>
							</div>
						)
					)}
				</div>
			</div>
			<div className={s.bot}>
				<span className={s.step}>Крок 1 з 3</span>
			</div>
		</div>
	)

	const initializedAvatar = useRef(false)

	const renderStep2 = () => (
		<div className={`${s.container} ${s.step2}`}>
			<div className={s.top}>
				<div className={s.cross} onClick={resetCreate}>
					<RxCross1 />
				</div>
			</div>
			<div className={s.titles}>
				<h1>Виберіть зображення профілю</h1>
				<h3>Завантажте фото або виберіть одне з доступних</h3>
			</div>
			<div className={s.mid}>
				<form className={s.left}>
					<form.Field name='avatar'>
						{field => (
							<div className={s.fieldContainer}>
								<label htmlFor='avatar'>
									<Image
										className={s.avatar}
										src={`${
											action === 'edit'
												? `${
														PF +
														(initializedAvatar.current
															? field.state.value
															: form.state.values.profile?.avatar ?? '')
												  }`
												: `${PF + field.state.value}`
										}`}
										width={256}
										height={256}
										alt=''
									/>
								</label>
								<input
									type='file'
									id='avatar'
									onChange={e => {
										if (e.target.files?.[0]) {
											uploadFile(e.target.files[0], field.setValue)
										}

										initializedAvatar.current = true
									}}
								/>
								<div className={s.textBlock}>
									<label htmlFor='avatar'>
										<MdOutlineCameraAlt /> <span>Завантажити своє фото</span>
									</label>
									<p>Максимальний розмір файлу 1 MB</p>
								</div>
							</div>
						)}
					</form.Field>
				</form>
				<div className={s.right}>
					{AvatarCarousel.map((item, i) => (
						<Carousel
							key={i}
							slider={item}
							onClick={val => {
								form.setFieldValue('avatar', val)
								initializedAvatar.current = true
							}}
						/>
					))}
				</div>
			</div>
			<div className={s.bot}>
				<div className={s.buttonBlock}>
					<button
						className={s.prev}
						onClick={() => {
							if (action === 'edit') {
								setStep(3)
								form.setFieldValue(
									'avatar',
									form.state.values.profile?.avatar ?? ''
								)
							} else {
								setStep(1)
								form.setFieldValue('avatar', 'user-img.jpg')
							}
						}}
					>
						{action === 'edit' ? 'Скасувати' : 'Назад'}
					</button>
					{action !== 'edit' && <span className={s.step}>Крок 2 з 3</span>}

					<button className={s.next} onClick={() => setStep(3)}>
						{action === 'edit' ? 'Зберегти' : 'Далі'}
					</button>
				</div>
			</div>
		</div>
	)

	const renderStep3 = () => (
		<div className={s.container}>
			<div className={s.top}>
				<Image src={`${PF}/logo.svg`} alt='Logo' width={136} height={44} />
				<div
					className={s.cross}
					style={{ visibility: action === 'edit' ? 'hidden' : 'visible' }}
					onClick={resetCreate}
				>
					<RxCross1 />
				</div>
			</div>
			<div className={s.mid}>
				<div className={s.titles}>
					<h1>
						{action === 'edit'
							? 'Налаштування профілю'
							: 'Назвіть свій профіль'}{' '}
					</h1>
					{action !== 'edit' && (
						<h3>Ім’я справжнє чи супергеройське — вибирати вам</h3>
					)}
				</div>
				<div className={s.content}>
					<div className={s.img} onClick={() => setStep(2)}>
						<Image
							src={`${
								action === 'edit'
									? `${
											PF +
											(initializedAvatar.current
												? form.state.values.avatar
												: form.state.values.profile?.avatar ?? '')
									  }`
									: `${PF + form.state.values.avatar}`
							}`}
							alt=''
							width={256}
							height={256}
						/>

						{action === 'edit' && (
							<div className={s.overlay}>
								<span>Змінити зображення</span>
							</div>
						)}
					</div>

					<div className={s.inputBlock}>
						<form.Field
							name='username'
							validators={{
								onBlur: ({ value }) =>
									value.trim() ? undefined : "Будь ласка, введіть ім'я профілю",
							}}
						>
							{field => (
								<TextInput
									{...useInput(field)}
									type='text'
									placeholder="Ім'я"
									maxLength={24}
									blur
								/>
							)}
						</form.Field>
						{action === 'edit' && (
							<span className={s.profileType}>
								Тип профілю:{' '}
								<b>
									{form.state.values.profile?.type
										? profileTypeLabels[form.state.values.profile?.type]
										: 'Сімейний'}
								</b>
							</span>
						)}

						<div className={`${s.buttonBlock} ${s.step3}`}>
							<button className={s.next} onClick={() => form.handleSubmit()}>
								{action === 'edit' ? 'Зберегти' : 'Створити'}
							</button>
							<button
								className={s.prev}
								onClick={() => {
									if (action === 'edit') {
										setAction('choose')
										setStep(0)
										form.reset()
										initializedAvatar.current = false
									} else {
										setStep(2)
									}
								}}
							>
								Скасувати
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className={s.bot}>
				{action === 'edit' ? (
					<span
						className={`${s.step} ${s.editStep}`}
						onClick={() => setAction('delete')}
					>
						Видалити профіль
					</span>
				) : (
					<span className={s.step}>Крок 3 з 3</span>
				)}
			</div>
		</div>
	)

	const renderDelete = () => (
		<div className={`${s.container} ${s.delete}`}>
			<div className={s.top}>
				<Image src={`${PF}/logo.svg`} alt='Logo' width={136} height={44} />
			</div>
			<div className={s.mid}>
				<div className={s.content}>
					<div className={s.img} onClick={() => setStep(2)}>
						<Image
							src={`${
								PF +
								(initializedAvatar.current
									? form.state.values.avatar
									: form.state.values.profile?.avatar ?? '')
							}`}
							alt=''
							width={256}
							height={256}
						/>
					</div>

					<div className={s.titles}>
						<h1>Ви дійсно хочете його видалити?</h1>
						<h3>Уся історія цього профілю зникне назавжди.</h3>
					</div>

					<div className={s.inputBlock}>
						<div className={`${s.buttonBlock} ${s.step3}`}>
							<button className={s.next} onClick={() => form.handleSubmit()}>
								Видалити
							</button>
							<button
								className={s.prev}
								onClick={() => {
									setAction('edit')
									setStep(3)
								}}
							>
								Скасувати
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)

	const searchParams = useSearchParams()

	const initialized = useRef(false)

	useEffect(() => {
		if (initialized.current) return

		const viewType = searchParams.get('view_type')
		if (action === 'choose' && viewType === 'add') {
			setStep(1)
			setPageType('all')
		}

		const isEditMode = searchParams.get('isEditMode')
		if (isEditMode) {
			setAction('edit')
		}

		initialized.current = true
	}, [action, searchParams])

	const shouldRenderSteps =
		action === 'create' ||
		action === 'edit' ||
		action === 'delete' ||
		(action === 'choose' && step > 0)

	if (shouldRenderSteps) {
		if (action === 'delete') return renderDelete()
		if (step === 1) return renderStep1()
		if (step === 2) return renderStep2()
		if (step === 3) return renderStep3()
	}

	return (
		<div className={s.container}>
			<div className={s.top}>
				<Image src={`${PF}/logo.svg`} alt='Logo' width={136} height={44} />
				{action === 'edit' ? (
					<button
						className={s.editProfileBtn}
						onClick={() => {
							setAction('choose')
							setStep(0)
						}}
					>
						Готово
					</button>
				) : (
					<span className={s.edit} onClick={() => setAction('edit')}>
						Редагувати профілі
					</span>
				)}
			</div>
			<div className={s.mid}>
				<h1>Хто дивиться?</h1>

				{user && (
					<div className={s.profiles}>
						{user?.profiles.length === 1 &&
						user?.profiles[0].type === 'family' ? (
							<div className={s.profiles}>
								<form.Field name='profile'>
									{field => (
										<div
											onClick={() => {
												field.setValue(user?.profiles[0])
												form.setFieldValue('isProfileExists', true)
												if (action === 'edit') {
													setStep(3)
												} else {
													form.handleSubmit()
												}
											}}
										>
											<ProfileItem
												profile={user.profiles[0]}
												isEdit={action === 'edit'}
											/>
										</div>
									)}
								</form.Field>

								<div
									onClick={() => {
										setAction('create')
										setPageType('kid')
										setStep(1)
									}}
								>
									<ProfileItem
										profile={{
											_id: '',
											name: 'Додати дитячий',
											type: ProfileType.KID12,
											megogoID: 0,
											avatar: null,
										}}
									/>
								</div>
							</div>
						) : (
							user.profiles.map((profile, i) => (
								<div key={i}>
									<form.Field name='profile'>
										{field => (
											<div
												onClick={() => {
													field.setValue(profile)
													form.setFieldValue('isProfileExists', true)
													if (action === 'edit') {
														setStep(3)
														form.setFieldValue('username', profile.name)
													} else {
														form.handleSubmit()
													}
												}}
											>
												<ProfileItem
													profile={profile}
													isEdit={action === 'edit'}
												/>
											</div>
										)}
									</form.Field>
								</div>
							))
						)}

						<div
							onClick={() => {
								setAction('create')
								setPageType('all')
								setStep(1)
							}}
						>
							<ProfileItem
								profile={{
									_id: '',
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

			<div className={`${s.bot} ${action === 'edit' ? s.editProfile : ''}`}>
				<div className={s.checkboxBlock}>
					<form.Field name='rememberMe'>
						{field => (
							<Checkbox
								{...useInput(field)}
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
