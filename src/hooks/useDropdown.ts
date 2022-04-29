import React, { KeyboardEvent, RefObject, useEffect, useState } from 'react'

const useDropdown = (items: string[], ref: RefObject<HTMLElement>, onItemClick: (value: string) => void) => {
	const [dropdown, setDropdown] = useState(false)
	const [activeIndex, setActiveIndex] = useState(0)

	const hideDropdownOnItemClick = (value: string) => {
		onItemClick(value)
		setDropdown(false)
	}

	const showDropdown = () => {
		setDropdown(true)
	}

	useEffect(() => {
		const onClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node | null)) {
				setDropdown(false)
			}
		}

		document.addEventListener('click', onClickOutside, true)

		return () => {
			document.removeEventListener('click', onClickOutside, true)
		}
	}, [ref])

	const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		switch (e.key) {
			case 'Tab':
				setDropdown(false)
			break
			
			case 'Enter':
				hideDropdownOnItemClick(items[activeIndex])
			break
			
			case 'ArrowUp':
				if (activeIndex > 0) {
					setActiveIndex((prevState) => prevState - 1)
				}

				else {
					setActiveIndex(items.length - 1)
				}
				
			break

			case 'ArrowDown':
				if (activeIndex < items.length - 1) {
					setActiveIndex((prevState) => prevState + 1)
				}

				else {
					setActiveIndex(0)
				}
			break

			default:
			break
		}
	}

	return {dropdown, onKeyDown, showDropdown, hideDropdownOnItemClick, activeIndex}
}

export default useDropdown
