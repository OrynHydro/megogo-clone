export const GenerateCode = (length: number) => {
	const givenSet = '1234567890'

	let code = ''
	for (let i = 0; i < length; i++) {
		let pos = Math.floor(Math.random() * givenSet.length)
		code += givenSet[pos]
	}

	return code
}
