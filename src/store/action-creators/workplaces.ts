import { createAsyncThunk } from '@reduxjs/toolkit'
import mockFetch from '../../api'

export const fetchWorkplaces = createAsyncThunk(
	'workplaces/fetchWorkplaces',
	() => mockFetch('workplaces').get()
		.then((workplaces: Workplace[]) => {
			return workplaces
		})
)

export const editWorkplace = createAsyncThunk(
	'workplaces/editWorkplace',
	(newWorkplace: Workplace) => mockFetch('workplaces').put(newWorkplace, newWorkplace.id).then(() => newWorkplace)
)
