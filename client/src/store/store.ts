import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import headerModalReducer from './header-modal/headerModalSlice'
import dropdownModalReducer from './dropdown-modal/dropdownModalSlice'

export const store = configureStore({
	reducer: {
		user: userReducer,
		headerModal: headerModalReducer,
		dropdownModal: dropdownModalReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
