import React, { MouseEvent } from 'react'
import './Button.css'

interface Props {
	className?: string
	text: string
	onClick: (e: MouseEvent) => void
	disabled?: boolean
	important?: boolean
	dull?: boolean
}

const Button = ({ className, text, onClick, disabled, important, dull } : Props) => (
	<button
		className={
			`button 
			${className ? className : ''} 
			${dull ? 'button--dull' : ''} 
			${important ? 'button--important' : ''}`
		} 
		onClick={onClick}
		disabled={disabled}
	>
		{text}
	</button>
)

export default Button
