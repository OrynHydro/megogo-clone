import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import headerModalReducer from './header-modal/headerModalSlice'

export const store = configureStore({
	reducer: {
		user: userReducer,
		headerModal: headerModalReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
