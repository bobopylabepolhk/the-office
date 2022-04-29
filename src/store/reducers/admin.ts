import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AdminState {
	newEmployeeModal: boolean
	newEmployee: {
		name: string,
		birthDate: Date,
		role: string
	},


}

const initialState : AdminState = {
	newEmployeeModal: false,
	newEmployee: {
		name: '',
		birthDate: new Date(),
		role: 'сотрудник'
	},
	
}

const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {
		changeName: (state, action: PayloadAction<string>) => {
			state.newEmployee.name = action.payload
		},

		changeRole: (state, action: PayloadAction<string>) => {
			state.newEmployee.role = action.payload
		},

		changeBirthDate: (state, action: PayloadAction<Date>) => {
			state.newEmployee.birthDate = action.payload
		},

		clearNewEmployee: (state) => {
			state.newEmployee = initialState.newEmployee
		},

		triggerNewEmployeeModal: (state) => {
			state.newEmployeeModal = ! state.newEmployeeModal
		}
	}
})

export const adminActions = adminSlice.actions

export default adminSlice.reducer
