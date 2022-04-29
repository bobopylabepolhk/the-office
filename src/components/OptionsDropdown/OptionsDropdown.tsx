import React from 'react'
import Option from '../Option/Option'
import './OptionsDropdown.css'

export interface Props {
	items: string[]
	onItemClick: (val: string) => void
	activeIndex: number
}

const OptionsDropdown = ({ items, onItemClick, activeIndex } : Props) => {
	return (
		<ul className='options no-bullets'>
			{
				items.map((item, index) => <Option isActive={index === activeIndex} key={index} value={item} onClick={() => onItemClick(item)} />)
			}
		</ul>
	)
}

export default OptionsDropdown
