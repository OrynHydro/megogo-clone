'use client'
import { FC, useEffect, useState } from 'react'
import s from './Header.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { headerNav, headerProfileDropdown } from '@/utils/header-nav'
import NavItem from './Nav-item/Nav-item'
import { IoSearchSharp } from 'react-icons/io5'
import { langMenu } from '@/utils/lang-menu'
import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { useDropdown } from '@/hooks/useDropdown'
import { IProfile } from '@/interfaces/profile.interface'
import axios from 'axios'
import { GoPlus } from 'react-icons/go'
import SubcategoryItem from './Subcategory-item/Subcategory-item'
import { GoDeviceMobile } from 'react-icons/go'
import { TiStarOutline } from 'react-icons/ti'
import { FaPlay } from 'react-icons/fa'

const Header: FC = () => {
	const PF = process.env.NEXT_PUBLIC_FOLDER

	const { changeModalState, setActiveProfile, setUser } = useActions()
	const { user, activeProfile } = useAuth()

	const dropdownSearch = useDropdown('search', s)
	const dropdownProfile = useDropdown('profile', s)
	const dropdownWatch = useDropdown('watch', s)

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

	const logoutHandler = async () => {
		try {
			await axios.post('/api/users/logout')
			setUser(null)
			setActiveProfile(null)
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
						.map((profile, index) => (
							<div key={index} className={s.profile}>
								<Image
									src={`${PF}${profile.avatar}`}
									className={s.img}
									alt='user'
									width={32}
									height={32}
									onClick={() => setActiveProfileHandler(profile)}
								/>
								<span>{profile.name}</span>
							</div>
						))}
					<Link className={s.profile} href={'/profile-choose?view_type=add'}>
						<div className={s.img}>
							<GoPlus fontSize={16} strokeWidth={0.5} />
						</div>
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
								src={`${PF}logo-white.svg`}
								priority
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
						{user && (
							<div
								className={s.watch}
								onMouseOver={dropdownWatch.toggle}
								onMouseOut={dropdownWatch.toggle}
								ref={dropdownWatch.ref}
							>
								<FaPlay fontSize={12} /> <span>Я ДИВЛЮСЯ</span>
								<div className={`${s.watchBlock} ${dropdownWatch.openClass}`}>
									<ul>
										<li>
											<Link href={'/'}>Обрані фільми</Link>
										</li>
										<li>
											<Link href={'/'}>Обрані канали</Link>
										</li>
										<li>
											<Link href={'/'}>Придбане</Link>
										</li>
									</ul>
									<Link href={'/'}>Дивитись все</Link>
								</div>
							</div>
						)}

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
													<Link href={'/profile-choose?isEditMode=true'}>
														Редагувати профілі
													</Link>
												</div>
											</div>
											{renderProfiles()}
										</li>
										<li className={s.megogoId}>
											Megogo ID: {activeProfile?.megogoID}
										</li>
										<li>
											{headerProfileDropdown.map((item, index) => (
												<SubcategoryItem key={index} item={item} profile />
											))}
										</li>
										<li className={s.loyalty}>
											<div className={s.item}>
												<GoDeviceMobile fontSize={24} strokeWidth={0.5} />
												<Link href={'/'}>Підключити передплату</Link>
											</div>
											<div className={s.item}>
												<TiStarOutline fontSize={24} />
												<Link href={'/'}>25 бонусів</Link>
											</div>
										</li>
										<li>
											<SubcategoryItem
												item={{ content: 'Вийти з акаунту', link: '' }}
												profile
												onClick={logoutHandler}
											/>
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
