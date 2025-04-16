import { FC } from 'react'
import s from './Subcategory-item.module.scss'
import { IHeaderNav } from '@/utils/header-nav'
import { ILangMenu } from '@/utils/lang-menu'

interface SubcategoryItemProps {
	item: IHeaderNav | ILangMenu
	isOpen?: boolean
	profile?: boolean
	onClick?: () => void
}

const SubcategoryItem: FC<SubcategoryItemProps> = ({
	item,
	isOpen,
	profile,
	onClick,
}) => {
	return (
		<div
			className={'short' in item ? `${s.subitem} ${s.menu}` : s.subitem}
			style={{ padding: profile ? '10px 0' : undefined }}
		>
			<p
				style={{
					cursor: !isOpen && 'short' in item ? 'default' : 'pointer',
					fontWeight: profile ? 500 : 400,
				}}
				onClick={onClick}
			>
				{item?.content}
			</p>
		</div>
	)
}

export default SubcategoryItem
