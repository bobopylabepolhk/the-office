import React, { ChangeEvent, MouseEvent } from 'react'
import Input from '../Input/Input'
import DatePicker from '../DatePicker/DatePicker'
import Error from '../Error/Error'
import Button from '../Button/Button'
import addLabel from '../../hoc/addLabel'
import useSelector from '../../hooks/useSelector'
import useDispatch from '../../hooks/useDispatch'
import AccessCodePrompt from '../AccessCodePrompt/AccessCodePrompt'
import getEmployeeByPersonalInfo from '../../utils/getEmployeeByPersonalInfo'
import { authActions } from '../../store/reducers/auth'
import './Auth.css'


const NameInput = addLabel(Input) 
const BirthDatePicker = addLabel(DatePicker) 


const Auth = () => {
	const name = useSelector(state => state.auth.name)
	const birthDate = useSelector(state => state.auth.birthDate)
	const employeeNotFoundError = useSelector(state => state.auth.errorEmployeeNotFound)
	const promptAccessCode = useSelector(state => state.auth.promptAccessCode)
	const dispatch = useDispatch()

	const { setCurrentEmployee, triggerEmployeeNotFoundError, triggerAccessCodePrompt, changeName, setBirthDate } = authActions
	const changeCurrentNameWithErrorTrigger = (e: ChangeEvent<HTMLInputElement>) => {
		if (employeeNotFoundError) {
			dispatch(triggerEmployeeNotFoundError())
		}
		dispatch(changeName(e.target.value))
	}
	const changeCurrentDateWithErrorTrigger = (newDate: Date) => {
		if (employeeNotFoundError) {
			dispatch(triggerEmployeeNotFoundError())
		}
		dispatch(setBirthDate(newDate))
	}

	const findEmployee = (e: MouseEvent) => {
		e.preventDefault()
		getEmployeeByPersonalInfo(name, birthDate).then(employee => {
			if (employee) {
				dispatch(setCurrentEmployee(employee))
				dispatch(triggerAccessCodePrompt())
			}
	
			else {
				dispatch(triggerEmployeeNotFoundError())
			}
		})
	}

	return (
		<div className='auth'>
			<h1 className='auth__headline'>Авторизоваться</h1>
			<form className='auth__form'>
				<NameInput
					label='ФИО'
					value={name}
					onChange={changeCurrentNameWithErrorTrigger}
					isError={employeeNotFoundError}
					placeholder='Фамилия Имя Отчество'
					disabled={promptAccessCode}
				/>
				<BirthDatePicker label='Дата рождения' onDateChange={changeCurrentDateWithErrorTrigger} disabled={promptAccessCode} />
				<Button className='auth__btn' text='Дальше' onClick={findEmployee} disabled={employeeNotFoundError || promptAccessCode} />
				{employeeNotFoundError &&
					<Error className='auth__error' errorMessage='Пользователь не найден' />
				}

				{promptAccessCode &&
					<AccessCodePrompt />
				}
			</form>
		</div>
	)
}

export default Auth
