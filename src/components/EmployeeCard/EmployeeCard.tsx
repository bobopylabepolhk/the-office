import React, { useState } from 'react'
import Button from '../Button/Button'
import getDisplayDate from '../../utils/getDisplayDate'
import DeleteEmployeeConfirmationDialog from '../DeleteEmployeeConfirmationDialog/DeleteEmployeeConfirmationDialog'
import './EmployeeCard.css'

interface Props extends Employee {
	deleteEmployee?: (id: number) => Promise<any>
}


const EmployeeCard = ({ id, name, birthDate, role, deleteEmployee } : Props) => {
	const [showDialog, setShowDialog] = useState(false)

	return (
		<div className='card employee-card'>
			{deleteEmployee && showDialog &&
				<DeleteEmployeeConfirmationDialog 
					closeDialog={() => setShowDialog(false)} 
					deleteEmployee={() => deleteEmployee(id)} 
				/>
			}
			<div>
				<h3>{name}</h3>
				<p>
					<strong>Дата рождения: </strong> 
					{getDisplayDate(birthDate)}
				</p>
				<p>
					<strong>Роль: </strong> 
					{role}
				</p>
			</div>

			{deleteEmployee &&
				<div className='card__buttons-container'>
					<Button text='Удалить' onClick={() => setShowDialog(true)} important />
				</div>
			}
		</div>
	)
}

export default EmployeeCard
