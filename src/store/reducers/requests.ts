import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addRequest, deleteRequest, fetchRequests } from '../action-creators/requests'

export interface RequestsState {
	requests: Array<WorkplaceRequest>,
	newRequest: NewRequest,
	isModalOpen: boolean,
	newRequestSuccess: boolean
}

interface NewRequest {
	employeeName: string,
	employeeBirthDate: Date,
	employeeRole: string,
	isRemote: boolean
	preferredOpeningTime: Time,
	preferredClosingTime: Time,
	workplaceId?: number
}

const initialState : RequestsState = {
	requests: [],
	isModalOpen: false,
	newRequestSuccess: false,
	newRequest: {
		employeeName: '',
		employeeBirthDate: new Date(),
		employeeRole: 'сотрудник',
		isRemote: false,
		preferredOpeningTime: {
			hours: 8,
			minutes: 0
		},
		preferredClosingTime: {
			hours: 22,
			minutes: 0
		}, 
	}
}

const requestsSlice = createSlice({
	name: 'requests',
	initialState,
	reducers: {
		changeEmployeeName: (state, action: PayloadAction<string>) => {
			state.newRequest.employeeName = action.payload
		},

		changeEmployeeRole: (state, action: PayloadAction<string>) => {
			state.newRequest.employeeRole = action.payload
		},

		changeEmployeeBirthDate: (state, action: PayloadAction<Date>) => {
			state.newRequest.employeeBirthDate = action.payload
		},

		changePreferredOpeningTime: (state, action: PayloadAction<Time>) => {
			state.newRequest.preferredOpeningTime = action.payload
		},

		changePreferredClosingTime: (state, action: PayloadAction<Time>) => {
			state.newRequest.preferredClosingTime = action.payload
		},

		setWorkplaceId: (state, action: PayloadAction<number>) => {
			state.newRequest.workplaceId = action.payload
		},

		triggerIsRemote: (state) => {
			state.newRequest.isRemote = !state.newRequest.isRemote
		},

		triggerModal: (state) => {
			state.isModalOpen = !state.isModalOpen
		},

		dismissNewRequestSuccess: (state) => {
			state.newRequestSuccess = false
			state.newRequest = initialState.newRequest
		}
	},

	extraReducers: {
		[fetchRequests.fulfilled.type]: (state, action: PayloadAction<WorkplaceRequest[]>) => {
			state.requests = action.payload
		},

		[addRequest.fulfilled.type]: (state, action: PayloadAction<WorkplaceRequest>) => {
			state.requests.push(action.payload)
			state.newRequestSuccess = true
		},

		[deleteRequest.fulfilled.type]: (state, action: PayloadAction<number>) => {
			state.requests = state.requests.filter(request => request.id !== action.payload)
		}
	}
})

export const requestsActions = requestsSlice.actions

export default requestsSlice.reducer
