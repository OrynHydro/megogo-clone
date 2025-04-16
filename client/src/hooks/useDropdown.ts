import { useClickAway } from './useClickAway'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'

export const useDropdown = (id: string, styles: { [key: string]: string }) => {
	const { setOpenId } = useActions()
	const openId = useTypedSelector(state => state.dropdownModal.openId)

	const isOpen = openId === id

	const toggle = () => {
		setOpenId(isOpen ? null : id)
	}

	const close = () => {
		setOpenId(null)
	}

	const ref = useClickAway(() => {
		if (isOpen) close()
	})

	const openClass = isOpen ? styles.open : ''

	return { isOpen, toggle, ref, openClass }
}
