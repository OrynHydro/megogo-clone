export const useInput = (tanstackField: any) => {
	const rawValue = tanstackField.state.value
	const value =
		tanstackField.name === 'code'
			? typeof rawValue === 'string'
				? Number(rawValue)
				: rawValue
			: rawValue

	return {
		field: {
			name: tanstackField.name,
			setValue: tanstackField.setValue,
			value,
			handleBlur: tanstackField.handleBlur,
		},
		fieldErrors: tanstackField.state.meta.errors.map(
			(err: any) => err?.message || err
		),
	}
}
