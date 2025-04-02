import Footer from './Footer/Footer'
import Header from './Header/Header'
import RegisterForm from './Header/Register-form/Register-form'
import AuthProvider from '@/providers/AuthProvider'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<section className='page-wrapper'>
				<Header />
				{children}
				<Footer />
				<RegisterForm />
			</section>
		</AuthProvider>
	)
}
