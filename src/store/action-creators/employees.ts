import { createAsyncThunk } from '@reduxjs/toolkit'
import mockFetch from "../../api"

export const fetchEmployees = createAsyncThunk(
	'employees/fetchEmployees',
	() => mockFetch('employees').get()
	.then((employees: Employee[]) => employees)
)

interface AddEmployeeArgs {
	name: string
	birthDate: Date
	role: string
}

export const addEmployee = createAsyncThunk(
	'employees/addEmployee',
	({ name, birthDate, role } : AddEmployeeArgs) => mockFetch('employees').post({ name, birthDate, role })
	.then(employeeId => ({ id: employeeId, name, birthDate, role }))
)

export const editEmployee = createAsyncThunk(
	'employees/editEmployee',
	(newEmployee: Employee) => mockFetch('employees').put(newEmployee, newEmployee.id)
	.then(() => newEmployee)
)

export const deleteEmployee = createAsyncThunk(
	'employees/deleteEmployee',
	(employeeId: number) => mockFetch('employees').delete(employeeId).then(() => employeeId)
)
