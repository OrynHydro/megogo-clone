'use client'
import { FC } from 'react'
import s from './Profile-choose.module.scss'
import Image from 'next/image'
import Checkbox from '@/components/ui/Checkbox/Checkbox'
import { useForm } from '@tanstack/react-form'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import ProfileItem from './Profile-item/Profile-item'
import { ProfileType } from '../../../../../shared/interfaces/user.interface'

const ProfileChoose: FC = () => {
	const PF = process.env.NEXT_PUBLIC_FOLDER

	const form = useForm({
		defaultValues: {
			rememberMe: false,
		},
		onSubmit: async ({ value }) => {},
	})

	const user = useTypedSelector(state => state.user.data)

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
						<ProfileItem user={user} profile={user.profiles[0]} />
						<ProfileItem
							user={user}
							profile={{
								name: 'Додати дитячий',
								type: ProfileType.KID12,
								avatar: null,
							}}
						/>
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
