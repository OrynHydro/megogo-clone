import { Dispatch, FC, SetStateAction, useRef } from 'react'
import s from './Register-form.module.scss'
import { RxCross1 } from 'react-icons/rx'
import { FieldApi, FieldInfo, useForm } from '@tanstack/react-form'
import { registerSchema } from '@/libs/schema/register.schema'

interface RegisterFormProps {
	props: {
		isModalOpen: boolean
		setIsModalOpen: Dispatch<SetStateAction<boolean>>
	}
}

const RegisterForm: FC<RegisterFormProps> = ({
	props: { isModalOpen, setIsModalOpen },
}) => {
	const closeModal = () => setIsModalOpen(false)

	const isFirstFocus = useRef<boolean>(true)

	const form = useForm({
		defaultValues: {
			phone: '',
		},
		validators: {
			onChange: registerSchema,
		},
	})

	const handleFocus = (field: any) => {
		if (isFirstFocus.current) {
			field.setValue('+380')
			isFirstFocus.current = false
		}
	}

	return (
		<div className={`${s.modal} ${isModalOpen ? s.open : ''}`}>
			<div className={s.block}>
				<div className={s.container}>
					<div className={s.top}>
						<h2>Вхід</h2>
						<RxCross1 className={s.cross} onClick={closeModal} />
					</div>
					<p>Для входу або реєстрації введіть свій номер телефону</p>
					<div className={s.inputBlock}>
						<form.Field name='phone'>
							{field => (
								<input
									type='tel'
									placeholder='Телефон'
									value={field.state.value}
									onFocus={() => handleFocus(field)}
									onChange={e => field.setValue(e.target.value)}
								/>
							)}
						</form.Field>
						<label className={s.checkboxBlock} htmlFor='checkbox'>
							<div className={s.checkbox}>
								<input
									className={`${s.tgl} ${s.tglLight}`}
									id='checkbox'
									type='checkbox'
								/>
								<label className={s.tglBtn} htmlFor='checkbox' />
							</div>
							<p>Запам'ятати мене</p>
						</label>
						<button>Отримати код</button>
					</div>
				</div>
			</div>
			<div className={s.overlay} onClick={closeModal} />
		</div>
	)
}

export default RegisterForm
