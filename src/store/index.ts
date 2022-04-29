import { combineReducers, configureStore } from '@reduxjs/toolkit'
import employees from './reducers/employees'
import workplaces from './reducers/workplaces'
import auth from './reducers/auth'
import requests from './reducers/requests'
import admin from './reducers/admin'

const mainReducer = combineReducers({ employees, workplaces, auth, requests, admin })
const store = configureStore({
	reducer: mainReducer
})

export type RootState = ReturnType<typeof mainReducer>
export type MyDispatch = typeof store.dispatch

export default store
