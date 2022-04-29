import React, { useEffect, FC } from 'react'
import { useNavigate } from 'react-router-dom'

const enforceAuth = (Component: FC) => (props: any) => {
	const navigate = useNavigate()
	useEffect(() => {
		const currentEmployee = localStorage.getItem('currentEmployee')
		if (!currentEmployee || !JSON.parse(currentEmployee).id) {
			navigate('/auth')
		}
	}, [navigate])

	return <Component {...props} />
}

export default enforceAuth