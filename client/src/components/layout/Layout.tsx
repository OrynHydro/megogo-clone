// layout.tsx
import Footer from './Footer/Footer'
import Header from './Header/Header'
import RegisterForm from './Header/Register-form/Register-form'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<section className='page-wrapper'>
			<Header />
			{children}
			<Footer />
			<RegisterForm />
		</section>
	)
}
