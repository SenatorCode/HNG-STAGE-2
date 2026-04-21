export function generateId() {
	const letters = Array.from({ length: 2 }, () =>
		String.fromCharCode(65 + Math.floor(Math.random() * 26)),
	).join('')
	const digits = String(Math.floor(Math.random() * 9000) + 1000)
	return letters + digits
}
