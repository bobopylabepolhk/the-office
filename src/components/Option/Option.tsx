import React, { MouseEvent } from 'react'
import './Option.css'

interface Props {
	value: string
	onClick: (e: MouseEvent) => void
	isActive: boolean
}

const Option = ({ value, onClick, isActive } : Props) => {
	return (
		<li className={`option ${isActive ? 'option--active' : ''}`}>
			<button className='option__button' tabIndex={-1} onClick={onClick}>{value}</button>
		</li>
	)
}

export default Option
