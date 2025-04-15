import { useRef, useState } from 'react'
import { useClickAway } from './useClickAway'

export const useDropdown = (id: string, styles: { [key: string]: string }) => {
	const [openId, setOpenId] = useState<string | null>(null)

	const registerDropdown = (id: string) => {
		const isOpen = openId === id
		const toggle = () => {
			setOpenId(prev => (prev === id ? null : id))
		}
		const close = () => setOpenId(null)

		return { isOpen, toggle, close }
	}

	const { isOpen, toggle, close } = registerDropdown(id)
	const ref = useClickAway(() => {
		if (isOpen) close()
	})

	const openClass = isOpen ? styles.open : ''

	return { isOpen, toggle, ref, openClass }
}
