import React, { ChangeEventHandler, FocusEventHandler, KeyboardEventHandler } from 'react'
import './Input.css'

export interface Props {
	className?: string
	isError?: boolean
	value: string
	onChange: ChangeEventHandler
	id?: string
	disabled?: boolean 
	placeholder?: string
	onFocus?: FocusEventHandler
	onKeyDown?: KeyboardEventHandler
}

const Input = ({ id, className, isError, value, onChange, onFocus, onKeyDown, disabled, placeholder } : Props) => {
	return (
		<input 
			type='text'
			id={id}
			className={`input ${isError ? 'input--error' : ''} ${className ? className : ''}`}
			value={value}
			onChange={onChange}
			disabled={disabled}
			placeholder={placeholder}
			onFocus={onFocus}
			onKeyDown={onKeyDown}
		/>
	)
}

export default Input