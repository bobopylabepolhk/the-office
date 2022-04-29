import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useSelector from '../../hooks/useSelector'
import Button from '../Button/Button'
import IconButton from '../IconButton/IconButton'
import LogOutIcon from './log-out.svg'
import { authActions } from '../../store/reducers/auth'
import './Header.css'
import useTypedDispatch from '../../hooks/useDispatch'

const Header = () => {
	const { setCurrentEmployee } = authActions
	const dispatch = useTypedDispatch()
	useEffect(() => {
		const currentEmployee = JSON.parse(localStorage.getItem('currentEmployee') as string)
		dispatch(setCurrentEmployee(currentEmployee))
	}, [dispatch])

	const employee = useSelector(state => state.auth.employee)

	const logOut = () => {
		localStorage.setItem('currentEmployee', '{}')
	}

	return (
		<header className='header'>
			<div className='header__container'>
				<h3>{employee?.name}</h3>
				<Link to='auth'>
					<IconButton onClick={logOut} icon={LogOutIcon} alt='ВЫЙТИ' />
				</Link>
			</div>


			{employee?.role === 'администратор' &&
				<div className='header__container'>
					<Link to='admin'>
						<Button text='Панель администратора' onClick={() => {}} />
					</Link>
				</div>
			}
		</header>
	)
}

export default Header
