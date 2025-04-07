'use client'
import React, {
	Dispatch,
	FC,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react'
import s from './Register-form.module.scss'
import { RxCross1 } from 'react-icons/rx'
import { FieldApi, FieldInfo, useForm } from '@tanstack/react-form'
import { registerSchema } from '@/libs/schema/register.schema'
import { FaChevronLeft } from 'react-icons/fa6'
import axios from 'axios'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import Checkbox from '@/components/ui/Checkbox/Checkbox'
import { useRouter } from 'next/navigation'
interface FormState {
	step: number
	loading: boolean
	timer: number
}

const RegisterForm: FC = () => {
	const { changeModalState, setUser } = useActions()
	const isOpen = useTypedSelector(state => state.headerModal.isOpen)

	const closeModal = () => {
		changeModalState()
		setFormState((prev: FormState) => ({
			...prev,
			step: 1,
			verificationCode: 0,
		}))
	}

	const router = useRouter()

	const isFirstFocus = useRef<boolean>(true)

	const [formState, setFormState] = useState({
		step: 1,
		loading: false,
		timer: 0,
	})

	const form = useForm({
		defaultValues: {
			phone: '',
			rememberMe: false,
			code: 1,
			verificationCode: 1,
		},
		validators: {
			onSubmit: registerSchema,
		},
		onSubmit: async ({ value }) => {
			if (formState.step === 1) {
				sendCode()
			} else if (formState.step === 2) {
				if (value.code !== value.verificationCode) {
					return
				} else {
					setFormState((prev: FormState) => ({
						...prev,
						loading: true,
					}))
					try {
						const res = await axios.post('/api/auth', {
							phone: value.phone,
							rememberMe: value.rememberMe,
						})
						const { phone, profiles } = res.data
						setUser({
							phone: phone,
							profiles: profiles,
						})
						router.push('/profile-choose')
					} catch (error) {
						console.error('Error:', error)
					} finally {
						setFormState((prev: FormState) => ({
							...prev,
							loading: false,
						}))
						changeModalState()
					}
				}
			}
		},
	})

	const sendCode = async () => {
		setFormState((prev: FormState) => ({
			...prev,
			loading: true,
		}))
		try {
			const res = await axios.post('/api/send-sms', {
				number: form.state.values.phone,
			})
			setFormState((prev: FormState) => ({
				...prev,
				step: 2,
				timer: 60,
			}))
			form.setFieldValue('verificationCode', res.data)
			// form.state.values.code = 0

			// this was done to avoid sending SMS in development mode
			form.setFieldValue('code', res.data)
		} catch (error) {
			console.error('Error:', error)
		} finally {
			setFormState((prev: FormState) => ({
				...prev,
				loading: false,
			}))
		}
	}

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null

		if (formState.timer > 0) {
			interval = setInterval(() => {
				setFormState(prev => ({
					...prev,
					timer: prev.timer - 1,
				}))
			}, 1000)
		} else if (formState.timer === 0 && interval) {
			clearInterval(interval)
		}

		return () => {
			if (interval) {
				clearInterval(interval)
			}
		}
	}, [formState.timer])

	const handleFocus = (field: any) => {
		if (isFirstFocus.current) {
			field.setValue('+380')
			isFirstFocus.current = false
		}
	}

	return (
		<div className={`${s.modal} ${isOpen ? s.open : ''}`}>
			<div className={s.block}>
				<form
					className={s.container}
					onSubmit={(e: React.FormEvent) => {
						e.preventDefault()
						form.handleSubmit()
					}}
				>
					{formState.loading ? (
						<div className={s.loader}></div>
					) : (
						<>
							<div className={s.top}>
								{formState.step === 1 ? (
									<>
										<h2>Вхід</h2>
										<RxCross1 className={s.cross} onClick={closeModal} />
									</>
								) : (
									<>
										<div
											className={s.return}
											onClick={() =>
												setFormState((prev: FormState) => ({
													...prev,
													step: 1,
												}))
											}
										>
											<FaChevronLeft fontSize={16} />
											назад
										</div>
										<RxCross1 className={s.cross} onClick={closeModal} />
									</>
								)}
							</div>

							{formState.step === 1 ? (
								<>
									<p>Для входу або реєстрації введіть свій номер телефону</p>
									<div className={s.inputBlock}>
										<form.Field name='phone'>
											{field => (
												<div className={s.field}>
													<input
														className={s.phone}
														type='tel'
														placeholder='Телефон'
														value={field.state.value}
														onFocus={() => handleFocus(field)}
														onChange={e => field.setValue(e.target.value)}
													/>
													{field.state.meta.errors.length > 0 && (
														<p className={s.error}>
															{field.state.meta.errors
																.map((err: any) => err?.message)
																.join(', ')}
														</p>
													)}
												</div>
											)}
										</form.Field>
										<form.Field name='rememberMe'>
											{field => (
												<Checkbox
													field={field}
													label="Запам'ятати мене"
													color='#fb640b'
												/>
											)}
										</form.Field>

										<button type='submit'>Отримати код</button>
									</div>
								</>
							) : (
								<div className={s.step}>
									<h3>Введіть код</h3>
									<p>
										Код від MEGOGO прийде в SMS-повідомленні, надісланому на{' '}
										<strong>{form.state.values.phone}</strong>.
									</p>
									<div className={s.inputBlock}>
										<form.Field name='code'>
											{field => (
												<div className={s.field}>
													<input
														type='number'
														placeholder='······'
														value={form.state.values.code || ''}
														onChange={e => {
															const newValue = e.target.value.slice(0, 6)
															field.setValue(Number(newValue))
														}}
														className={s.code}
													/>
													{field.state.meta.errors.length > 0 && (
														<p className={s.error}>
															{field.state.meta.errors
																.map((err: any) => err?.message)
																.join(', ')}
														</p>
													)}
												</div>
											)}
										</form.Field>
									</div>
									<div className={s.buttonBlock}>
										<button type='submit'>Підтвердити</button>
										<button
											disabled={formState.timer > 0}
											onClick={() => sendCode()}
										>
											Надіслати код повторно{' '}
											{formState.timer > 0 && `(${formState.timer})`}
										</button>
									</div>
								</div>
							)}
						</>
					)}
				</form>
			</div>
			<div className={s.overlay} onClick={closeModal} />
		</div>
	)
}

export default RegisterForm
