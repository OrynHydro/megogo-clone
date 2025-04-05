import ProfileChoose from '@/components/screens/Profile-choose.tsx/Profile-choose'
import { RootProvider } from '@/providers/AuthProvider'

export default function ProfileChoosePage() {
	return (
		<RootProvider>
			<ProfileChoose />
		</RootProvider>
	)
}
