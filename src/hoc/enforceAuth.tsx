import React, { useEffect, FC } from 'react'
import getCurrentEmployeeFromLocalStorage from '../utils/getCurrentEmployeeFromLocalStorage'
import { useNavigate } from 'react-router-dom'

const enforceAuth = (Component: FC) => (props: any) => {
	const navigate = useNavigate()
	useEffect(() => {
		const currentEmployee = getCurrentEmployeeFromLocalStorage() 
		if (!currentEmployee) {
			navigate('/auth')
		}
	}, [navigate])

	return <Component {...props} />
}

export default enforceAuth