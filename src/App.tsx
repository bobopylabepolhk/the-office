import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './components/Auth/Auth'
import Main from './components/Main/Main'
import Admin from './components/Admin/Admin'
import WorkplaceDetails from './components/WorkplaceDetails/WorkplaceDetails'
import './index.css'
import initializeLocalStorage from './api/initializeLocalStorage'

const App = () => {
	useEffect(() => {
		initializeLocalStorage()
	}, [])

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='admin' element={<Admin />} />
				<Route path='auth' element={<Auth />} />
				<Route path='workplace/:id' element={<WorkplaceDetails />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
