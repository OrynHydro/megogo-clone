import { FC } from 'react'
import s from './Footer-top.module.scss'
import {
	FooterApps,
	FooterLinksLeft,
	FooterLinksRight,
	FooterMedia,
} from '@/utils/footer-items'
import Link from 'next/link'
import Image from 'next/image'

const FooterTop: FC = () => {
	const PF = process.env.NEXT_PUBLIC_FOLDER
	return (
		<div className={s.footerTop}>
			<div className={'content-wrapper'}>
				<div className={s.container}>
					<div className={s.top}>
						<div className={s.left}>
							<div className={s.block}>
								<h3 className={s.title}>{FooterLinksLeft.title}</h3>
								<ul className={`${s.links} ${s.linksLeft}`}>
									{FooterLinksLeft.sub.map((item, index) => (
										<li key={index} className={s.link}>
											<Link href={item.link}>{item.content}</Link>
										</li>
									))}
								</ul>
							</div>
							<div className={s.block}>
								<Link href={FooterLinksRight.link} className={s.title}>
									{FooterLinksRight.title}
								</Link>
								<ul className={s.links}>
									{FooterLinksRight.sub.map((item, index) => (
										<li key={index} className={s.link}>
											<Link href={item.link}>{item.content}</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className={s.right}>
							<div className={s.block}>
								<h3 className={s.title}>Підтримка користувачів</h3>
								<Link href={'mailto:support@megogo.net'} className={s.email}>
									support@megogo.net
								</Link>
								<ul className={s.faq}>
									<li className={s.link}>
										<Link href={'#'}>Усі контакти</Link>
									</li>

									<li className={s.link}>
										<Link href={'#'}>Питання та відповіді</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className={s.bottom}>
						<div className={s.left}>
							<h3 className={s.title}>Наші додатки</h3>
							<ul className={s.apps}>
								{FooterApps.map((app, index) => (
									<li key={index} className={s.app}>
										<Link href={app.link} target='_blank' rel='noreferrer'>
											<Image
												width={124}
												height={40}
												alt=''
												src={`${PF}footer-apps/${app.img}`}
											/>
										</Link>
									</li>
								))}
							</ul>
						</div>
						<div className={s.right}>
							<h3 className={s.title}>Ми в соцмережах</h3>
							<ul className={s.media}>
								{FooterMedia.map((media, index) => (
									<li key={index} className={s.app}>
										<Link href={media.link} target='_blank' rel='noreferrer'>
											<Image
												width={32}
												height={32}
												alt=''
												src={`${PF}footer-media/${media.icon}`}
											/>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FooterTop
