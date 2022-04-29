import React, { MouseEvent } from "react"
import './IconButton.css'

interface Props {
	icon: string,
	onClick: (e: MouseEvent) => void,
	alt: string,
	className?: string
}

const IconButton = ({ className, icon, onClick, alt } : Props) => {
	return (
		<button className={`icon-button button-reset ${className ? className : ''}`} onClick={onClick}>
			<img className='icon-button__icon-container' src={icon} alt={alt} />
		</button>
	)
}

export default IconButton
