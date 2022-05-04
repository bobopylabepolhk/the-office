import React, { ChangeEvent } from 'react'
import formatDate from '../../utils/formatDate'
import './DatePicker.css'

export interface Props {
	id?: string
	onDateChange: (newDate: Date) => void
	disabled?: boolean
	initialValue?: Date
}

const DatePicker = ({ disabled, onDateChange, initialValue } : Props) => {
	const setDateFromCalendar = (e: ChangeEvent<HTMLInputElement>) => {
		onDateChange(new Date(e.target.valueAsNumber))
	}

	return (
		<input 
			className='input date-picker'
			onChange={setDateFromCalendar}
			type='date'
			// min={formatDate(min)}
			// max={formatDate(max)}
			disabled={disabled}
			defaultValue={initialValue ? formatDate(initialValue) : ''}
		/> 
	)
}

export default DatePicker
