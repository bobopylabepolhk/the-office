import React from 'react'
import DialogWindow from '../DialogWindow/DialogWindow'
import Button from '../Button/Button'


interface Props {
	closeDialog: () => void
	deleteEmployee: () => Promise<void>
}

const DeleteEmployeeConfirmationDialog = ({ closeDialog, deleteEmployee } : Props) => {
	const deleteAndCloseDialog = () => {
		deleteEmployee().then(() => {
			closeDialog()
		})
	}

	return (
		<DialogWindow closeDialog={closeDialog}>
			<p>Точно хотите удалить этого работника?</p>
			<div className='employee-card__buttons'>
				<Button text='Да' onClick={deleteAndCloseDialog} important />
				<Button text='Нет' onClick={closeDialog} dull />
			</div>
		</DialogWindow>
	)
}

export default DeleteEmployeeConfirmationDialog
