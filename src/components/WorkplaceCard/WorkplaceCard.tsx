import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import useDispatch from '../../hooks/useDispatch'
import { editWorkplace } from '../../store/action-creators/workplaces'
import './WorkplaceCard.css'

interface Props extends Workplace {
	kickOutEmployee?: boolean
}

const WorkplaceCard = ({ name, id, employee, closesAt, devices, isRemote, opensAt, kickOutEmployee }: Props) => {
	const dispatch = useDispatch()
	const onKickOutEmployee = () => {
		dispatch(editWorkplace({ name, id, employee: null, closesAt, devices, isRemote, opensAt }))
	}

	return (
		<div className='card workplace-card'>
			<h3 className='workplace-card__headline'>{name}</h3>

			<p className='workplace-card__info'>Идентификатор: {id}</p>

			{employee ?
				<p className='workplace-card__info'><strong>Здесь работает</strong><br />{employee.name}</p> :
				<p className='workplace-card__info'><strong>Свободно</strong></p>
			}

			<p className='workplace-card__link'>
				<Link to={`workplace/${id}`}>Подробнее</Link>
			</p>
			
				{employee && kickOutEmployee &&
					<div className='workplace-card__kick-out'>
						<Button text='Освободить' onClick={onKickOutEmployee} />
					</div>
				}
		</div>
	)
}

export default WorkplaceCard
