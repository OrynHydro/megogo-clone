'use client'
import { useState } from 'react'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import RegisterForm from './Header/Register-form/Register-form'

export default function Layout({ children }: { children: React.ReactNode }) {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	return (
		<section className='page-wrapper'>
			<Header props={{ isModalOpen, setIsModalOpen }} />
			{children}
			<Footer />
			<RegisterForm props={{ isModalOpen, setIsModalOpen }} />
		</section>
	)
}
