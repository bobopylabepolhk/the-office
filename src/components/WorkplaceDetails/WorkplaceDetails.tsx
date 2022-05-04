import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import enforceAuth from '../../hoc/enforceAuth'
import Button from '../Button/Button'
import BackButton from '../BackButton/BackButton'
import WorkplaceRequestDialog from '../WorkplaceRequestDialog/WorkplaceRequestDialog'
import getDisplayTime from '../../utils/getDisplayTime'
import mockFetch from '../../api'
import getCurrentEmployeeFromLocalStorage from '../../utils/getCurrentEmployeeFromLocalStorage'
import { requestsActions } from '../../store/reducers/requests'
import useDispatch from '../../hooks/useDispatch'
import EmployeeCard from '../EmployeeCard/EmployeeCard'
import './WorkplaceDetails.css'

const WorkplaceDetails = () => {
	const dispatch = useDispatch()
	const id = Number(useParams().id)
	const [workplace, setWorkplace] = useState<Workplace | null>(null)
	const { setWorkplaceId, changeEmployeeBirthDate, changeEmployeeName, changeEmployeeRole, triggerModal } = requestsActions

	useEffect(() => {
		mockFetch('workplaces').get(id).then((workplace: Workplace) => setWorkplace(workplace))
	}, [])

	if (!workplace) {
		return (
			<section className='workplace-doesnt-exist'>
				<BackButton />
				Такого рабочего места нет(
			</section>
		)
	}
	

	const prepare = () => {
		const currentEmployee = getCurrentEmployeeFromLocalStorage()!

		dispatch(changeEmployeeBirthDate(new Date(currentEmployee.birthDate)))
		dispatch(changeEmployeeName(currentEmployee.name))
		dispatch(changeEmployeeRole(currentEmployee.role))
		dispatch(setWorkplaceId(workplace.id))
		dispatch(triggerModal())
	}

	return (
		<section className='workplace-details'>
			<WorkplaceRequestDialog />
			<BackButton />
			<h1 className='workplace-details__headline'>{workplace.name}</h1>
			<div className='workplace-details__row'>
				<div className='workplace-details__col'>
					<p>
						{getDisplayTime(workplace.opensAt)} — {getDisplayTime(workplace.closesAt)}
					</p>
					<p>{workplace.isRemote ? 'Удалённо' : 'В офисе'}</p>
				</div>
				

				<div className='workplace-details__col'>
					{workplace.employee ?
						<Fragment>
								<p className='workplace-details__caption'>
									Здесь работает:
								</p> 
								<EmployeeCard {...workplace.employee} />
						</Fragment>
						:
						<Fragment>
							<p className='workplace-details__up-for-grabs'>Здесь пока никто не работает</p>
							<Button text='Оставить заявку' onClick={prepare} />
						</Fragment>
					}
				</div>
			</div>
			

			<br />

			<p><strong>Оборудование:</strong></p>
			<br />
			<ul className='no-bullets'>
				{workplace.devices.map((device, index) => <li key={index}>{device}</li>)}
			</ul>
			
		</section>
	)
}

export default enforceAuth(WorkplaceDetails)
