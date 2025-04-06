import { PayloadAction } from './../../../node_modules/@reduxjs/toolkit/src/createAction'
import { createSlice, Draft } from '@reduxjs/toolkit'
import { IUser } from '@/interfaces/user.interface'
import { IProfile, ProfileType } from '@/interfaces/profile.interface'

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		data: null as IUser | null,
		activeProfile: null as IProfile | null,
	},
	reducers: {
		setUser: (state, action: PayloadAction<IUser | null>) => {
			state.data = action.payload as Draft<IUser | null>
		},
		setActiveProfile: (state, action: PayloadAction<IProfile | null>) => {
			state.activeProfile = action.payload as Draft<IProfile | null>
		},
	},
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
