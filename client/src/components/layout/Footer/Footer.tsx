import { FC } from 'react'
import s from './Footer.module.scss'
import FooterTop from './Footer-top/Footer-top'
import FooterBottom from './Footer-bottom/Footer-bottom'

const Footer: FC = () => {
	return (
		<footer className={s.footer}>
			<div className={s.container}>
				<FooterTop />
				<FooterBottom />
			</div>
		</footer>
	)
}

export default Footer
