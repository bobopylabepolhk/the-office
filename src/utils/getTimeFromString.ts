const getTimeFromString = (strTime: string) => {
	const [hours, minutes] = strTime.split(':').map(timePart => Number(timePart))

	return { hours, minutes }
}

export default getTimeFromString
