import React, { ChangeEvent, MouseEvent, useEffect } from 'react'
import AutoComplete from '../AutoComplete/AutoComplete'
import Select from '../Select/Select'
import Button from '../Button/Button'
import DatePicker from '../DatePicker/DatePicker'
import TimePicker from '../TimePicker/TimePicker'
import Checkbox from '../Checkbox/Checkbox'
import WorkplaceCard2 from '../WorkplaceCard2/WorkplaceCard2'
import useSelector from '../../hooks/useSelector'
import addLabel from '../../hoc/addLabel'
import useDispatch from '../../hooks/useDispatch'
import { fetchEmployees } from '../../store/action-creators/employees'
import { fetchWorkplaces } from '../../store/action-creators/workplaces'
import { addRequest } from '../../store/action-creators/requests'
import { requestsActions } from '../../store/reducers/requests'
import './WorkplaceRequest.css'

const NameAutoComplete = addLabel(AutoComplete)
const BirthDatePicker = addLabel(DatePicker)
const RoleSelect = addLabel(Select)

const OpeningTimePicker = addLabel(TimePicker)
const ClosingTimePicker = addLabel(TimePicker)

const WorkplaceRequest = () => {
	const {
		employeeName,
		employeeRole,
		employeeBirthDate,
		workplaceId,
		preferredOpeningTime,
		preferredClosingTime,
		isRemote
	} = useSelector(state => state.requests.newRequest)
	const employees = useSelector(state => state.employees.employees)
	const workplaces = useSelector(state => state.workplaces.workplaces)
	const dispatch = useDispatch()
	const { 
		setWorkplaceId,
		changeEmployeeName,
		changeEmployeeBirthDate,
		changeEmployeeRole,
		changePreferredClosingTime,
		changePreferredOpeningTime,
		triggerIsRemote
	} = requestsActions

	useEffect(() => {
		dispatch(fetchEmployees())
		dispatch(fetchWorkplaces())
	}, [dispatch])

	const submit = (e: MouseEvent) => {
		e.preventDefault()
		dispatch(addRequest({ name: employeeName, birthDate: employeeBirthDate, role: employeeRole, workplaceId: workplaceId! }))
	}

	const readyToSubmit = workplaceId && employeeName

	const filterWorkplaces = (workplace: Workplace) => {
		const openingTimeMatch = workplace.opensAt.hours > preferredOpeningTime.hours ||
			(workplace.opensAt.hours === preferredOpeningTime.hours && workplace.opensAt.minutes >= preferredOpeningTime.minutes)
		
		const closingTimeMatch = workplace.closesAt.hours < preferredClosingTime.hours ||
			(workplace.closesAt.hours === preferredClosingTime.hours && workplace.closesAt.minutes <= preferredClosingTime.minutes)
		
		const remoteMatch = isRemote ? workplace.isRemote : true

		if (remoteMatch && openingTimeMatch && closingTimeMatch) {
			return (
				<WorkplaceCard2 
					key={workplace.id} 
					onSelect={() => dispatch(setWorkplaceId(workplace.id))} {...workplace} 
					selected={workplaceId ? workplaceId === workplace.id : false} 
				/>
			)
		}
		
		return <></>
	}

	const roles = ['сотрудник', 'администратор']

	const employeeNames = employees.map(employee => employee.name)

	const onEmployeeNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(changeEmployeeName(e.target.value))
	}

	const onEmployeeNameSet = (newName: string) => {
		dispatch(changeEmployeeName(newName))
	}

	const onEmployeeBirthDateChange = (newBirthDate: Date) => {
		dispatch(changeEmployeeBirthDate(newBirthDate))
	}

	const onEmployeeRoleSet = (newRole: string) => {
		dispatch(changeEmployeeRole(newRole))
	}

	const onPreferredOpeningTimeChange = (newTime: Time) => {
		dispatch(changePreferredOpeningTime(newTime))
	}

	const onPreferredClosingTimeChange = (newTime: Time) => {
		dispatch(changePreferredClosingTime(newTime))
	}

	return (
		<div className='workplace-request'>
			<h1>Запрос на рабочее место</h1>

			<div className='workplace-request__row'>
				<div className='workplace-request__employee'>
					<h3 className='workplace-request__section-headline'>Cотрудник</h3>
					<NameAutoComplete 
						items={employeeNames}
						label='ФИО'
						onChange={onEmployeeNameChange}
						onItemClick={onEmployeeNameSet}
						value={employeeName}
						placeholder='Фамилия Имя Отчество' 
					/>
					<BirthDatePicker 
						label='Дата рождения' 
						onDateChange={onEmployeeBirthDateChange}
						initialValue={employeeBirthDate}
					/>
					<RoleSelect 
						value={employeeRole} 
						label='Роль'
						items={roles} 
						onItemClick={onEmployeeRoleSet} 
					/>
				</div>

				<div className='workplace-request__filters'>
					<h3 className='workpalce-request__section-headline'>Фильтры</h3>
					<p>Рабочее время</p>
					<div className='workplace-request__row'>
						<div className='workplace-request__timepicker'>
							<OpeningTimePicker 
								label='С'
								value={preferredOpeningTime}
								setNewTime={onPreferredOpeningTimeChange}
							/>
						</div>
						<ClosingTimePicker 
							label='До'
							value={preferredClosingTime}
							setNewTime={onPreferredClosingTimeChange}
						/>
					</div>
					<Checkbox label='Удалённо' onChange={() => dispatch(triggerIsRemote())} />
				</div>
			</div>

			<div className='workplace-request__row workplace-request__workplaces no-scroll'>
				<div>
					<h3 className='workplace-request__section-headline'>Подходящие рабочие места</h3>
					<div className='card-container'>
						{workplaces.map(filterWorkplaces)}
					</div>
				</div> 
			</div>

			<Button text='Отправить' onClick={submit} disabled={!readyToSubmit} />
		</div>
	)
}

export default WorkplaceRequest
