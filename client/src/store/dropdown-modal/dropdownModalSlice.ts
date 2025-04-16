import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const dropdownModalSlice = createSlice({
	name: 'dropdownModal',
	initialState: {
		openId: null as string | null,
	},
	reducers: {
		setOpenId: (state, action: PayloadAction<string | null>) => {
			state.openId = action.payload
		},
	},
})

export const { setOpenId } = dropdownModalSlice.actions

export default dropdownModalSlice.reducer
