import React, { ChangeEvent } from 'react'
import getDisplayTime from '../../utils/getDisplayTime'
import getTimeFromString from '../../utils/getTimeFromString'
import './TimePicker.css'

export interface Props {
	id?: string
	value: Time
	setNewTime: (newTime: Time) => void
}

const TimePicker = ({ id, value, setNewTime } : Props) => {
	const strValue = getDisplayTime(value)
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newTime = getTimeFromString(e.target.value)
		setNewTime(newTime)
	}

	return (
		<input id={id} value={strValue} className='input time-picker' type='time' onChange={onChange} />
	)
}

export default TimePicker
