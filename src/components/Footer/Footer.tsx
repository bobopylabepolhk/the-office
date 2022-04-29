import React from 'react'
import { requestsActions } from '../../store/reducers/requests'
import useDispatch from '../../hooks/useDispatch'
import Button from '../Button/Button'
import './Footer.css'

const Footer = () => {
	const { triggerModal } = requestsActions
	const dispatch = useDispatch()
	
	return (
		<footer className='footer'>
			<Button className='footer__btn' text='Оставить заявку' onClick={() => dispatch(triggerModal())} />
		</footer>
	)
}

export default Footer
