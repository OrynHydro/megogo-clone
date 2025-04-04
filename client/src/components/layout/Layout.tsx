import Footer from './Footer/Footer'
import Header from './Header/Header'
import RegisterForm from './Header/Register-form/Register-form'
import { RootProvider } from '@/providers/AuthProvider'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<section className='page-wrapper'>
			<RootProvider>
				<Header />
				{children}
				<Footer />
				<RegisterForm />
			</RootProvider>
		</section>
	)
}
