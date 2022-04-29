import React from 'react'
import { useNavigate } from 'react-router-dom'
import IconButton from '../IconButton/IconButton'
import Back from './back.svg'
import './BackButton.css'

const BackButton = () => {
	const navigate = useNavigate()
	return <IconButton className='back-button' icon={Back} alt='НАЗАД' onClick={() => navigate(-1)} />
}

export default BackButton
