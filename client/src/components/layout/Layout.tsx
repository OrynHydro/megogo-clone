import Footer from './Footer/Footer'
import Header from './Header/Header'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<section className='page-wrapper'>
			<Header />
			{children}
			<Footer />
		</section>
	)
}
