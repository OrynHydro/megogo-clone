'use client'
import { FC, useState } from 'react'
import s from './Header.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { headerNav } from '@/utils/header-nav'
import NavItem from './Nav-item/Nav-item'
import { IoSearchSharp } from 'react-icons/io5'
import { langMenu } from '@/utils/lang-menu'
import { useClickAway } from '@/hooks/useClickAway'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'

const Header: FC = () => {
	const PF = process.env.NEXT_PUBLIC_FOLDER
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const ref = useClickAway(() => setIsOpen(false))
	const openClass = isOpen ? s.open : ''
	const { changeModalState } = useActions()
	const user = useTypedSelector(state => state.user.data)

	return (
		<div className={s.header}>
			<div className='content-wrapper'>
				<div className={s.container}>
					<div className={s.left}>
						<Link href='/' className={s.logo}>
							<Image
								src={`${PF}/logo-white.svg`}
								alt='Logo'
								width={100}
								height={50}
							/>
						</Link>
						<nav className={s.nav}>
							{headerNav.map((item, index) => (
								<NavItem key={index} item={item} />
							))}
						</nav>
					</div>
					<nav className={s.right}>
						<div>
							<Link href={'/'}>Тарифи</Link>
						</div>
						<div ref={ref} className={s.search} onClick={() => setIsOpen(true)}>
							<IoSearchSharp
								fontSize={19}
								className={`${s.icon} ${openClass}`}
							/>
							<div className={`${s.searchBlock} ${openClass}`}>
								<IoSearchSharp fontSize={19} className={s.searchIcon} />
								<input type='text' placeholder='Пошук' />
								<Link href={'/'}>Фільтри</Link>
							</div>
						</div>
						<div>
							<NavItem isMenu item={langMenu} />
						</div>
						{!user ? (
							<div onClick={() => changeModalState()}>УВІЙТИ</div>
						) : (
							<Link href={'/account'} className={s.user}>
								<Image
									width={32}
									height={32}
									alt='user'
									src={`${PF}/user-img.jpg`}
								/>
							</Link>
						)}
					</nav>
				</div>
			</div>
		</div>
	)
}

export default Header
