import Layout from '@/components/layout/Layout'
import { RootProvider } from '@/providers/AuthProvider'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<RootProvider>
			<Layout>{children}</Layout>
		</RootProvider>
	)
}
