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
	const [counter, setCounter] = useState<number>(
		typeof field.value === 'string' ? field.value.length : 0
	)

	return (
		<div className={s.field}>
			<div className={s.inputContainer}>
				<input
					className={`${s.input} ${isCode ? s.code : ''} ${
						fieldErrors.length > 0 ? s.error : ''
					}`}
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
							const numericValue = Number(newValue)
							field.setValue(isNaN(numericValue) ? '' : numericValue)
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
			</div>

			{fieldErrors.length > 0 && (
				<p className={s.error}>{fieldErrors.join(', ')}</p>
			)}
		</div>
	)
}

export default TextInput
