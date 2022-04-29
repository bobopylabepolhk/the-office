import { createAsyncThunk } from '@reduxjs/toolkit'
import mockFetch from "../../api"

interface AddRequestArgs {
	name: string
	birthDate: Date
	role: string
	workplaceId: number
}

export const addRequest = createAsyncThunk(
	'requests/addRequest',
	({ name, birthDate, role, workplaceId } : AddRequestArgs) => mockFetch('requests').post({ name, birthDate, role, workplaceId })
	.then(requestId => ({ name, birthDate, role, workplaceId, id: requestId }))
)

export const fetchRequests = createAsyncThunk(
	'requests/fetchRequests',
	() => mockFetch('requests').get().then((requests: WorkplaceRequest[]) => requests)
)

export const deleteRequest = createAsyncThunk(
	'requests/deleteRequest',
	(requestId: number) => mockFetch('requests').delete(requestId).then(() => requestId)
)
