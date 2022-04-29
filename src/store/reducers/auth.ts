import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
	name: string,
	accessCode: string
	birthDate: Date,
	employee?: Employee,
	errorEmployeeNotFound: boolean,
	errorWrongAccessCode: boolean,
	promptAccessCode: boolean
}

const initialState : AuthState = {
	name: '',
	accessCode: '',
	birthDate: new Date(),	
	errorEmployeeNotFound: false,
	errorWrongAccessCode: false,
	promptAccessCode: false
} 

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCurrentEmployee: (state, action: PayloadAction<Employee>) => {
			state.employee = action.payload
		},

		changeName: (state, action: PayloadAction<string>) => {
			state.name = action.payload
		},

		changeAccessCode: (state, action: PayloadAction<string>) => {
			state.accessCode = action.payload
		},

		setBirthDate: (state, action: PayloadAction<Date>) => {
			state.birthDate = action.payload
		},

		triggerEmployeeNotFoundError: (state) => {
			state.errorEmployeeNotFound = !state.errorEmployeeNotFound
		},

		triggerAccessCodePrompt: (state) => {
			state.promptAccessCode = !state.promptAccessCode
		},

		triggerWrongAccessCodeError: (state) => {
			state.errorWrongAccessCode = !state.errorWrongAccessCode
		}
	}
})

export const authActions = authSlice.actions

export default authSlice.reducer