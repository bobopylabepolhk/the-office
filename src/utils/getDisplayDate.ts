const getDateWithSkloneniya = (date: Date) => {
	const newDateInstance = new Date(date)
	const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
	const day = newDateInstance.getDate()
	const monthIndex = newDateInstance.getMonth()
	const year = newDateInstance.getFullYear()

	return `${day} ${months[monthIndex]} ${year} г.`
}

export default getDateWithSkloneniya
