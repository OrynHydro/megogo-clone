import { FC, useState } from 'react'
import s from './Text-input.module.scss'

interface TextInputProps {
	field: {
		name: string
		setValue: (value: string | number) => void
		value?: string | number
		handleBlur: () => void
	}
	fieldErrors: string[]
	focus?: (field: any) => void
	blur?: boolean
	isCode?: boolean
	type: string
	placeholder: string
	maxLength?: number
}

const TextInput: FC<TextInputProps> = ({
	field,
	focus,
	fieldErrors,
	type,
	placeholder,
	isCode,
	maxLength,
	blur,
}) => {
	const [counter, setCounter] = useState<number>(0)

	return (
		<div className={s.field}>
			<input
				className={`${s.input} ${isCode ? s.code : ''}`}
				type={type}
				placeholder={placeholder}
				value={field.value || ''}
				maxLength={maxLength || undefined}
				onFocus={() => {
					if (focus) focus(field)
				}}
				onChange={e => {
					if (isCode) {
						const newValue = e.target.value.slice(0, 6)
						field.setValue(Number(newValue))
					} else if (maxLength) {
						setCounter(e.target.value.length)
						field.setValue(e.target.value)
					} else {
						field.setValue(e.target.value)
					}
				}}
				onBlur={() => {
					if (blur) {
						field.handleBlur()
					}
				}}
			/>
			{maxLength && (
				<span className={s.counter}>
					{counter}/{maxLength}
				</span>
			)}
			{fieldErrors.length > 0 && (
				<p className={s.error}>{fieldErrors.join(', ')}</p>
			)}
		</div>
	)
}

export default TextInput
