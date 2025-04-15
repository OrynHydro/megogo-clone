'use client'
import { FC, useState } from 'react'
import s from './Nav-item.module.scss'
import { IHeaderNav } from '@/utils/header-nav'
import { TfiMoreAlt } from 'react-icons/tfi'
import SubcategoryItem from '../Subcategory-item/Subcategory-item'
import { ILangMenu } from '@/utils/lang-menu'
import { useClickAway } from '@/hooks/useClickAway'
import { useDropdown } from '@/hooks/useDropdown'

interface NavItemProps {
	item: IHeaderNav | ILangMenu
	isMenu?: boolean
}

const NavItem: FC<NavItemProps> = ({ item, isMenu }) => {
	// const [isOpen, setIsOpen] = useState<boolean>(false)
	const langMenu = useDropdown('langMenu', s)
	return (
		<div
			className={`${s.item} ${isMenu ? s.menu : ''} ${langMenu.openClass}`}
			onClick={() => isMenu && langMenu.toggle()}
			ref={langMenu.ref}
		>
			<div className={`${s.content} ${item.content ? '' : s.more}`}>
				{item.content ? (
					'short' in item ? (
						item.short
					) : (
						item.content
					)
				) : (
					<TfiMoreAlt className={s.icon} />
				)}
			</div>
			{item.subcategory && (
				<div className={s.subcategory}>
					{item.subcategory.map((subitem, index) => (
						<SubcategoryItem
							key={index}
							isOpen={langMenu.isOpen}
							item={subitem}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default NavItem
