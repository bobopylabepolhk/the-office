import React, { FC, useId } from 'react'
import { Props as InputProps } from '../components/Input/Input'
import { Props as DatePickerProps} from '../components/DatePicker/DatePicker'
import { Props as AutoCompleteProps } from '../components/AutoComplete/AutoComplete'
import { Props as SelectProps } from '../components/Select/Select'
import { Props as TimePickerProps } from '../components/TimePicker/TimePicker'

type ControlProps = InputProps | DatePickerProps | AutoCompleteProps | SelectProps | TimePickerProps
type LabeledControlProps = ControlProps & {
	label: string
} 

const addLabel = (Component: FC<any>) => (props: LabeledControlProps) => {
	const { label, ...controlProps } = props
	const id = useId()

	return (
		<div className='input-with-label'>
			<label className='input-with-label__label' htmlFor={id}>{label}</label>
			<Component {...controlProps} id={id} />
		</div>
	)
}

export default addLabel