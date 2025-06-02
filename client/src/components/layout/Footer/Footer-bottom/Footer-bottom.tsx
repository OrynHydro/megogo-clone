import { FC } from 'react'
import s from './Footer-bottom.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { FooterNav } from '@/utils/footer-items'
import NavItem from '../../Header/Nav-item/Nav-item'

const FooterBottom: FC = () => {
	const PF = process.env.NEXT_PUBLIC_FOLDER
	return (
		<div className={s.footerBottom}>
			<div className='content-wrapper'>
				<div className={s.container}>
					<div className={s.left}>
						<Link href='/' className={s.logo}>
							<Image
								src={`${PF}/logo-white.svg`}
								priority
								alt='Logo'
								width={100}
								height={50}
							/>
						</Link>
						<nav className={s.nav}>
							{FooterNav.map((item, index) => (
								<NavItem key={index} item={item} footer />
							))}
						</nav>
					</div>
					<div className={s.right}>
						<p className={s.copyright}>
							© {new Date().getFullYear()} MEGOGO. Всі права захищені.
						</p>
						<Image
							src={`${PF}/21plus_shield.svg`}
							width={36}
							height={36}
							alt=''
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FooterBottom
