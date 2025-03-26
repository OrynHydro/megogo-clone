import { Dispatch, SetStateAction } from 'react'

export interface IModalProps {
	props: {
		isModalOpen: boolean
		setIsModalOpen: Dispatch<SetStateAction<boolean>>
	}
}
