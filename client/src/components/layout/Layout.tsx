import { Provider } from 'react-redux'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import RegisterForm from './Header/Register-form/Register-form'
import { store } from '../../store/store'
import { RootProvider } from '@/providers/AuthProvider'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<RootProvider>
			<section className='page-wrapper'>
				<Header />
				{children}
				<Footer />
				<RegisterForm />
			</section>
		</RootProvider>
	)
}
