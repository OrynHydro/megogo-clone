export interface AvatarCarouselProps {
	title: string
	folder: string
	avatars: string[]
}

const avatars = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png']

export const AvatarCarousel: AvatarCarouselProps[] = [
	{ title: 'Люди', folder: 'people/' },
	{ title: 'Веселі тварини', folder: 'fun-animals/' },
	{ title: 'Ділові тварини', folder: 'business-animals/' },
	{ title: 'Губка Боб', folder: 'sponge-bob/' },
	{ title: 'Кунг-фу Панда', folder: 'kung-fu-panda/' },
	{ title: 'Чудики', folder: 'weirdos/' },
	{ title: 'Настрій', folder: 'mood/' },
	{ title: 'MEGOGO', folder: 'megogo/' },
].map(item => ({
	...item,
	avatars,
}))
