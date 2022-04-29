import React, { ChangeEvent, MouseEvent } from 'react'
import Input from '../Input/Input'
import Button from '../Button/Button'
import Error from '../Error/Error'
import addLabel from '../../hoc/addLabel'
import useSelector from '../../hooks/useSelector'
import useDispatch from '../../hooks/useDispatch'
import { authActions } from '../../store/reducers/auth'
import { editEmployee } from '../../store/action-creators/employees'
import { useNavigate } from 'react-router-dom'
import './AccessCodePrompt.css'

const AccessCodeInput = addLabel(Input) 

const AccessCodePrompt = () => {
	const errorWrongAccessCode = useSelector(state => state.auth.errorWrongAccessCode)
	const accessCode = useSelector(state => state.auth.accessCode)
	const employee = useSelector(state => state.auth.employee)!
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { changeAccessCode, triggerWrongAccessCodeError } = authActions
	const changeCurrentAccessCodeWithErrorTrigger = (e: ChangeEvent<HTMLInputElement>) => {
		if (errorWrongAccessCode) {
			dispatch(triggerWrongAccessCodeError())
		}

		dispatch(changeAccessCode(e.target.value))
	}
	

	const comment = employee?.accessCode ? 'Введите код доступа' : 'Новый код доступа (от 6 символов)'
	const verifyAccessCode = () => {
		const worker = new window.Worker('./hash-worker.js')

		worker.postMessage(accessCode)
		worker.onmessage = (event: MessageEvent<string>) => {
			if (employee?.accessCode === event.data) {
				localStorage.setItem('currentEmployee', JSON.stringify(employee))
				navigate('/')
			}
	
			else {
				dispatch(triggerWrongAccessCodeError())
			}

			worker.terminate()
		}
	}
	const assignAccessCode = () => {
		const worker = new window.Worker('./hash-worker.js')

		worker.postMessage(accessCode)
		worker.onmessage = (event: MessageEvent<string>) => {
			dispatch(editEmployee({ ...employee, accessCode: event.data }))
				.then(() => {
					localStorage.setItem('currentEmployee', JSON.stringify({ ...employee, accessCode: event.data }))
					navigate('/')
					worker.terminate()
				})
		}
	}

	const submit = employee?.accessCode ? verifyAccessCode : assignAccessCode
		
	const logIn = (e: MouseEvent) => {
		e.preventDefault()	

		if (accessCode.length >= 6) {
			submit()
		}

		else {
			dispatch(triggerWrongAccessCodeError())
		}
	}

	return (
		<div className='access-code-prompt'>
			<AccessCodeInput label={comment} value={accessCode} onChange={changeCurrentAccessCodeWithErrorTrigger} />
			<Button text='Войти' onClick={logIn} disabled={errorWrongAccessCode} />
			{errorWrongAccessCode && <Error className='access-code-prompt__error' errorMessage='Неверный код доступа' />}
		</div>
	)
}

export default AccessCodePrompt
