import { FC } from 'react'
import s from './Checkbox.module.scss'

interface CheckboxProps {
	field: {
		name: string
		setValue: (value: boolean) => void
		value?: boolean
	}
	label: string
	color: string
}

const Checkbox: FC<CheckboxProps> = ({ field, label, color }) => {
	return (
		<label
			className={s.checkboxBlock}
			htmlFor={`checkbox-${field.name}`}
			style={{ '--checkbox-color': color } as React.CSSProperties}
		>
			<div className={s.checkbox}>
				<input
					className={`${s.tgl} ${s.tglLight}`}
					id={`checkbox-${field.name}`}
					type='checkbox'
					checked={field.value}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						field.setValue(e.target.checked)
					}}
				/>
				<label className={s.tglBtn} htmlFor={`checkbox-${field.name}`} />
			</div>
			<p>{label}</p>
		</label>
	)
}

export default Checkbox
