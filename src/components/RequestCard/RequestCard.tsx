import React from 'react'
import Button from '../Button/Button'
import { deleteRequest } from '../../store/action-creators/requests'
import { editWorkplace } from '../../store/action-creators/workplaces'
import { addEmployee } from '../../store/action-creators/employees'
import useDispatch from '../../hooks/useDispatch'
import getEmployeeByPersonalInfo from '../../utils/getEmployeeByPersonalInfo'
import './RequestCard.css'

interface Props {
	employeeBirthDate: Date,
	employeeName: string,
	employeeRole: string
	requestId: number
	workplace: Workplace
	kickOutEmployee: (employeeId: number) => void
}

const RequestCard = ({ employeeBirthDate, employeeName, employeeRole, requestId, workplace, kickOutEmployee } : Props) => {
	const dispatch = useDispatch()
	const denyRequest = () => dispatch(deleteRequest(requestId))
	const acceptRequest = () => {
		getEmployeeByPersonalInfo(employeeName, employeeBirthDate)
			.then(employee => {
				if (employee) {
					kickOutEmployee(employee.id)
					dispatch(editWorkplace({ ...workplace, employee }))
				}

				else {
					const employeeWOId = { birthDate: employeeBirthDate, name: employeeName, role: employeeRole }
					dispatch(
						addEmployee(employeeWOId)
					)
					.unwrap()
					.then(employee => dispatch(editWorkplace({ ...workplace, employee })))
				}				
			})
			.then(denyRequest)
	}

	return (
		<div className='card request-card'>
			<div>
				<p><strong>Работник:</strong> {employeeName}</p>
				<p><strong>Рабочее место:</strong> {workplace.name}</p>
			</div>
			
			<div className='card__buttons-container'>
				<Button text='Принять' onClick={acceptRequest} />
				<Button text='Отклонить' onClick={denyRequest} dull />
			</div>
			
		</div>
	)
}

export default RequestCard
