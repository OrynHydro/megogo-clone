export const useInput = (tanstackField: any) => {
	return {
		field: {
			name: tanstackField.name,
			setValue: tanstackField.setValue,
			value: tanstackField.state.value,
			handleBlur: tanstackField.handleBlur,
		},
		fieldErrors: tanstackField.state.meta.errors.map(
			(err: any) => err?.message || err
		),
	}
}
