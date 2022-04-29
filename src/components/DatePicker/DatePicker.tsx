import React, { ChangeEvent } from 'react'
import './DatePicker.css'

export interface Props {
	id?: string
	onDateChange: (newDate: Date) => void
	disabled?: boolean 
}

const DatePicker = ({ disabled, onDateChange } : Props) => {
	const setDateFromCalendar = (e: ChangeEvent<HTMLInputElement>) => {
		onDateChange(new Date(e.target.valueAsNumber))
	}

	return (
		<input 
			className='input date-picker'
			onChange={setDateFromCalendar}
			type='date'
			disabled={disabled} 
		/> 
	)
}

export default DatePicker
