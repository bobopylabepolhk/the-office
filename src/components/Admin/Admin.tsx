import React, { useEffect, useCallback } from 'react'
import enforceAuth from '../../hoc/enforceAuth'
import EmployeeCard from '../EmployeeCard/EmployeeCard'
import WorkplaceCard from '../WorkplaceCard/WorkplaceCard'
import BackButton from '../BackButton/BackButton'
import Button from '../Button/Button'
import RequestCard from '../RequestCard/RequestCard'
import useSelector from '../../hooks/useSelector'
import useDispatch from '../../hooks/useDispatch'
import NewEmployeeDialog from '../NewEmployeeDialog/NewEmployeeDialog'
import { fetchEmployees, deleteEmployee } from '../../store/action-creators/employees'
import { fetchRequests } from '../../store/action-creators/requests'
import { editWorkplace, fetchWorkplaces } from '../../store/action-creators/workplaces'
import { adminActions } from '../../store/reducers/admin'
import './Admin.css'

const Admin = () => {
	const employees = useSelector(state => state.employees.employees)
	const requests = useSelector(state => state.requests.requests)
	const workplaces = useSelector(state => state.workplaces.workplaces)
	const { triggerNewEmployeeModal } = adminActions

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchEmployees())
		dispatch(fetchRequests())
		dispatch(fetchWorkplaces())
	}, [dispatch])

	const kickOutEmployee = useCallback((employeeId: number) => {
		const workplaceToUpdate = workplaces.find(workplace => workplace.employee && workplace.employee.id === employeeId)
		if (workplaceToUpdate) {
			dispatch(editWorkplace({ ...workplaceToUpdate, employee: null }))
		}
	}, [workplaces])

	const deleteEmployeeEverywhere = (employeeId: number) => dispatch(deleteEmployee(employeeId)).then(() => kickOutEmployee(employeeId))

	return (
		<div className='admin'>
			<NewEmployeeDialog />
			<BackButton />

			<h1>Панель администратора</h1>
			
			<section className='admin-section'>
				<div className='admin-section__headline'>
					<h2>Сотрудники</h2>
					<Button text='Добавить' onClick={() => dispatch(triggerNewEmployeeModal())} />
				</div>
				<div className='card-container'>
					{employees.map(employee => {
						const currentEmployee: Employee = JSON.parse(localStorage.getItem('currentEmployee')!)

						if (currentEmployee.id !== employee.id) {
							return <EmployeeCard key={employee.id} deleteEmployee={() => deleteEmployeeEverywhere(employee.id)} {...employee} />
						}

						return <></>
					})}
				</div>
			</section>

			<section className='admin-section'>
				<h2 className='admin-section__headline'>Рабочие места</h2>
				<div className='card-container'>
					{
						workplaces.map(workplace => {
							return (
								<WorkplaceCard
									key={workplace.id}
									kickOutEmployee
									{...workplace}
								/>
							)
						})
					}
				</div>
			</section>

			<section className='admin-section'>
				<h2 className='admin-section__headline'>Заявки</h2>
				<div className='card-container'>
					{
						requests.map(request => {
							const requestedWorkplace = workplaces.find(workplace => workplace.id === request.workplaceId)!
							return (
								<RequestCard
									key={request.id}
									kickOutEmployee={kickOutEmployee}
									requestId={request.id}
									employeeBirthDate={request.birthDate}
									employeeName={request.name}
									employeeRole={request.role}
									workplace={requestedWorkplace}
								/>
							)
						})
					}
				</div>
			</section>
		</div>
	)
}

export default enforceAuth(Admin)
