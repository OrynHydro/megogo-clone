import { FC } from 'react'
import s from './Subcategory-item.module.scss'
import { IHeaderNav } from '@/utils/header-nav'
import { ILangMenu } from '@/utils/lang-menu'

interface SubcategoryItemProps {
	item: IHeaderNav | ILangMenu
	isOpen?: boolean
}

const SubcategoryItem: FC<SubcategoryItemProps> = ({ item, isOpen }) => {
	return (
		<div className={'short' in item ? `${s.subitem} ${s.menu}` : s.subitem}>
			<p style={{ cursor: !isOpen && 'short' in item ? 'default' : 'pointer' }}>
				{item?.content}
			</p>
		</div>
	)
}

export default SubcategoryItem
