import addZero from './addZero'

const formatDate = (date: Date) => {
	const yyyy = date.getFullYear()
	const mm = addZero(date.getMonth())
	const dd = addZero(date.getDate() + 1)

	return `${yyyy}-${mm}-${dd}`
}

export default formatDate
