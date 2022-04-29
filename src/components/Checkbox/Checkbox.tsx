import React, { ChangeEvent, useId } from 'react'
import './Checkbox.css'

interface Props {
	isChecked?: boolean
	onChange: (e: ChangeEvent<HTMLInputElement>) => void,
	label: string
}

const Checkbox = ({ isChecked, onChange, label } : Props) => {
	const id = useId()
	return (
		<div className='checkbox'>
			<input id={id} type='checkbox' className='checkbox__hidden' checked={isChecked} onChange={onChange} />
			<label className='checkbox__label' htmlFor={id}>{label}</label>
		</div>
	)
}

export default Checkbox
