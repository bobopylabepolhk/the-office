import React, { ChangeEvent } from 'react'
import Input from '../Input/Input'
import Button from '../Button/Button'
import DialogWindow from '../DialogWindow/DialogWindow'
import DatePicker from '../DatePicker/DatePicker'
import Select from '../Select/Select'
import useSelector from '../../hooks/useSelector'
import useDispatch from '../../hooks/useDispatch'
import addLabel from '../../hoc/addLabel'
import { adminActions } from '../../store/reducers/admin'
import './NewEmployeeDialog.css'
import { addEmployee } from '../../store/action-creators/employees'

const NameInput = addLabel(Input)
const BirthDatePicker = addLabel(DatePicker)
const RoleSelect = addLabel(Select)

const NewEmployeeDialog = () => {
	const isModalOpen = useSelector(state => state.admin.newEmployeeModal)
	const { name, birthDate, role } = useSelector(state => state.admin.newEmployee)
	const dispatch = useDispatch()
	const { changeName, changeBirthDate, changeRole, clearNewEmployee, triggerNewEmployeeModal } = adminActions

	const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(changeName(e.target.value))
	}

	const onBirthDateChange = (newDate: Date) => {
		dispatch(changeBirthDate(newDate))
	}

	const onRoleSet = (newRole: string) => {
		dispatch(changeRole(newRole))
	}

	const triggerModal = () => {
		dispatch(triggerNewEmployeeModal())
		dispatch(clearNewEmployee())
	}

	const submit = () => {
		dispatch(addEmployee({ name, birthDate, role })).then(() => triggerModal())
	}

	if (isModalOpen) {
		return (
			<DialogWindow closeDialog={triggerModal}>
				<div className='new-employee'>
					<h1>Новый сотрудник</h1>
					<NameInput label='ФИО' onChange={onNameChange} value={name} />
					<BirthDatePicker label='Дата рождения' onDateChange={onBirthDateChange} />
					<RoleSelect 
						label='Роль' 
						value={role} 
						items={['сотрудник', 'администратор']} 
						onItemClick={onRoleSet}
					/>
	
					<Button text='Добавить' onClick={submit} />
				</div>
			</DialogWindow>
		)
	}

	return <></>
	
}

export default NewEmployeeDialog
