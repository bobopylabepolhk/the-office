const getCurrentEmployeeFromLocalStorage = () => {
	const currentEmployeeStr = localStorage.getItem('currentEmployee')
	if (currentEmployeeStr) return JSON.parse(currentEmployeeStr) as Employee
	
	return null
}

export default getCurrentEmployeeFromLocalStorage
