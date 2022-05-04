import React, { useRef } from 'react'
import OptionsDropdown from '../OptionsDropdown/OptionsDropdown'
import useDropdown from '../../hooks/useDropdown'
import './Select.css'

export interface Props {
	items: string[]
	onItemClick: (val: string) => void
	value: string
}

const Select = ({ value, items, onItemClick } : Props) => {
	const selectRef = useRef(null)
	const dropdownRef = useRef(null)
	const { showDropdown, hideDropdownOnItemClick, onKeyDown, activeIndex, dropdown } = useDropdown(items, selectRef, dropdownRef, onItemClick)

	return (
		<div className='select' ref={selectRef}>
			<div 
				onClick={showDropdown}
				className='input select__selected' 
				onKeyDown={onKeyDown} 
				tabIndex={0} 
				onFocus={showDropdown}
			>
				{value}
			</div>
			{dropdown &&
				<OptionsDropdown ref={dropdownRef} items={items} onItemClick={hideDropdownOnItemClick} activeIndex={activeIndex} />
			}
		</div>
	)
}

export default Select
