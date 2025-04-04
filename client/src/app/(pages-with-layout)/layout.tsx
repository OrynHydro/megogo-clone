import Layout from '@/components/layout/Layout'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <Layout>{children}</Layout>
}
