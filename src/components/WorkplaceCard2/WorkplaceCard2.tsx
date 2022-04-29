import React, { MouseEvent } from 'react'
import getDisplayTime from '../../utils/getDisplayTime'
import './WorkplaceCard2.css'

interface Props extends Workplace {
	onSelect: (id: number) => void,
	selected: boolean
}

const WorkplaceCard2 = ({ name, employee, opensAt, closesAt, id, isRemote, onSelect, selected } : Props) => {
	const onClick = (e: MouseEvent) => {
		e.preventDefault()
		onSelect(id)
	}

	return (
		<button className={`card workplace-card2 ${selected ? 'workplace-card2--selected' : ''} button-reset`} onClick={onClick}>
			<div className='workplace-card2__container'>
				<h3 className='workplace-card2__name'>{name}</h3>
				<p>{getDisplayTime(opensAt)} <br /> {getDisplayTime(closesAt)}</p>
			</div>
			
			<p className='workplace-card2__employee'>{employee ? 'Сейчас занято' : 'Свободно'}</p>
			{isRemote &&
				<p className='workplace-card2__remote'>Удалённо</p>
			}
		</button>
	)
}

export default WorkplaceCard2
