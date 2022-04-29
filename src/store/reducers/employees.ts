import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchEmployees, addEmployee, deleteEmployee } from "../action-creators/employees"

interface EmployeesState {
	employees: Array<Employee>
}

const initialState : EmployeesState = {
	employees: []
}

const employeesSlice = createSlice({
	name: 'employees',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchEmployees.fulfilled.type]: (state, action: PayloadAction<Employee[]>) => {
			state.employees = action.payload
		},

		[addEmployee.fulfilled.type]: (state, action: PayloadAction<Employee>) => {
			state.employees.push(action.payload)
		},

		[deleteEmployee.fulfilled.type]: (state, action: PayloadAction<number>) => {
			state.employees = state.employees.filter(employee => employee.id !== action.payload)
		},
	}
})

export default employeesSlice.reducer
