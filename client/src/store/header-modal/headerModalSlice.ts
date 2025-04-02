import { createSlice, Draft } from '@reduxjs/toolkit'

export const headerModalSlice = createSlice({
	name: 'headerModal',
	initialState: {
		isOpen: false,
	},
	reducers: {
		changeModalState: state => {
			state.isOpen = !state.isOpen
		},
	},
})

export const { changeModalState } = headerModalSlice.actions

export default headerModalSlice.reducer
