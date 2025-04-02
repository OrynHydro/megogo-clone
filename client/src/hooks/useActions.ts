import { useDispatch } from 'react-redux'
import { userSlice } from '@/store/user/userSlice'
import { useMemo } from 'react'
import { bindActionCreators } from '@reduxjs/toolkit'
import { headerModalSlice } from '@/store/header-modal/headerModalSlice'

const rootActions = {
	...userSlice.actions,
	...headerModalSlice.actions,
}

export const useActions = () => {
	const dispatch = useDispatch()

	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
