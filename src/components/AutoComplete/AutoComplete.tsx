import React, { useRef } from 'react'
import useDropdown from '../../hooks/useDropdown'
import Input, { Props as InputProps } from '../Input/Input'
import OptionsDropdown from '../OptionsDropdown/OptionsDropdown'
import './AutoComplete.css'

export interface Props extends InputProps {
	items: string[]
	onItemClick: (val: string) => void
}

const AutoComplete = ({ value, items, onChange, onItemClick, ...inputProps } : Props) => {
	const filteredItems = items.filter(item => item.toLowerCase().includes(value.toLowerCase()))
	const fullMatch = filteredItems.length === 1 && filteredItems[0] === value
	const autoCompleteRef = useRef(null)
	const dropdownRef = useRef(null)
	const { dropdown, showDropdown, onKeyDown, activeIndex, hideDropdownOnItemClick} = useDropdown(items, autoCompleteRef, dropdownRef, onItemClick)
	
	return (
		<div className='autocomplete' ref={autoCompleteRef}>
			<Input className='autocomplete__input' onFocus={showDropdown} onKeyDown={onKeyDown} value={value} onChange={onChange} {...inputProps} />
			{!fullMatch && dropdown &&
				<OptionsDropdown ref={dropdownRef} items={filteredItems} onItemClick={hideDropdownOnItemClick} activeIndex={activeIndex}  />
			}
		</div>
	)
}

export default AutoComplete
