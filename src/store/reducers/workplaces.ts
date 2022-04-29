import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { editWorkplace, fetchWorkplaces } from '../action-creators/workplaces'

export interface WorkplacesState {
	workplaces: Array<Workplace>
}

const initialState : WorkplacesState = {
	workplaces: [],
}

const workplacesSlice = createSlice({
	name: 'workplaces',
	initialState,
	reducers: {},

	extraReducers: {
		[fetchWorkplaces.fulfilled.type]: (state, action: PayloadAction<Workplace[]>) => {
			state.workplaces = action.payload
		},

		[editWorkplace.fulfilled.type]: (state, action: PayloadAction<Workplace>) => {
			state.workplaces = state.workplaces.map(workplace => (
				workplace.id === action.payload.id ?
					action.payload :
					workplace
			))
		}
	}
})

export const workplacesActions = workplacesSlice.actions

export default workplacesSlice.reducer