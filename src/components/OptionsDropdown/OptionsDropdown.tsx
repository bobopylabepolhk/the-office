import React, { forwardRef } from 'react'
import Option from '../Option/Option'
import './OptionsDropdown.css'

export interface Props {
	items: string[]
	onItemClick: (val: string) => void
	activeIndex: number
}

const OptionsDropdown = forwardRef<HTMLUListElement, Props>(({ items, onItemClick, activeIndex }, ref) => {
	return (
		<ul className='options no-bullets no-scroll' ref={ref}>
			{
				items.map((item, index) => <Option isActive={index === activeIndex} key={index} value={item} onClick={() => onItemClick(item)} />)
			}
		</ul>
	)
})

export default OptionsDropdown
