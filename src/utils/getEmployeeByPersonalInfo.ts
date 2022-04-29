import mockFetch from '../api'

const getEmployeeByPersonalInfo = async (name: string, birthDate: Date) => {
	const employee = await mockFetch('employees').get()
		.then((employees: Array<Employee>) => {
			return employees.find(employee => {
				return new Date(employee.birthDate).toDateString() === new Date(birthDate).toDateString() && employee.name === name
			})
		})

	return employee
}

export default getEmployeeByPersonalInfo
