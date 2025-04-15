'use client'
import { FC, useEffect, useState } from 'react'
import s from './Header.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { headerNav } from '@/utils/header-nav'
import NavItem from './Nav-item/Nav-item'
import { IoSearchSharp } from 'react-icons/io5'
import { langMenu } from '@/utils/lang-menu'
import { useClickAway } from '@/hooks/useClickAway'
import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { useDropdown } from '@/hooks/useDropdown'
import { IProfile } from '@/interfaces/profile.interface'
import axios from 'axios'
import { GoPlus } from 'react-icons/go'

const Header: FC = () => {
	const PF = process.env.NEXT_PUBLIC_FOLDER

	const { changeModalState, setActiveProfile } = useActions()
	const { user, activeProfile } = useAuth()

	const dropdownSearch = useDropdown('search', s)
	const dropdownProfile = useDropdown('profile', s)

	const setActiveProfileHandler = async (profile: IProfile) => {
		try {
			await axios.post('/api/profiles/set-profile', {
				profile,
			})
			setActiveProfile(profile)
			document.location.reload()
		} catch (error) {
			console.log(error)
		}
	}

	const renderProfiles = () => {
		if (user?.profiles) {
			return (
				<div className={s.profiles}>
					{user.profiles
						.filter(profile => profile._id !== activeProfile?._id)
						.map(profile => (
							<div key={profile._id} className={s.profile}>
								<Image
									src={`${PF}${profile.avatar}`}
									alt='user'
									width={32}
									height={32}
									onClick={() => setActiveProfileHandler(profile)}
								/>
								<span>{profile.name}</span>
							</div>
						))}
					<Link className={s.profile} href={'/profile-choose?view_type=add'}>
						<GoPlus className={s.img} />
						<span>Додати</span>
					</Link>
				</div>
			)
		}
		return null
	}

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
						<div
							ref={dropdownSearch.ref}
							className={s.search}
							onClick={dropdownSearch.toggle}
						>
							<IoSearchSharp
								fontSize={19}
								className={`${s.icon} ${dropdownSearch.openClass}`}
							/>
							<div className={`${s.searchBlock} ${dropdownSearch.openClass}`}>
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
							<div
								className={`${s.user} ${dropdownProfile.openClass}`}
								title={activeProfile?.name}
								ref={dropdownProfile.ref}
								onClick={dropdownProfile.toggle}
							>
								<Image
									width={32}
									height={32}
									alt='user'
									src={`${PF}${activeProfile?.avatar}`}
								/>
								<div className={s.profileDropdown} title=''>
									<ul className={s.content}>
										<li className={s.info}>
											<div className={s.active}>
												<Image
													src={`${PF}${activeProfile?.avatar}`}
													alt='user'
													width={36}
													height={36}
												/>
												<div className={s.text}>
													<p>{activeProfile?.name}</p>
													<span>Редагувати профілі</span>
												</div>
											</div>
											{renderProfiles()}
										</li>
										<li className={s.megogoId}>
											Megogo ID: {activeProfile?.megogoID}
										</li>
									</ul>
								</div>
							</div>
						)}
					</nav>
				</div>
			</div>
		</div>
	)
}

export default Header
