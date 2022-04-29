import React, { Fragment } from 'react'
import DialogWindow from '../DialogWindow/DialogWindow'
import WorkplaceRequest from '../WorkplaceRequest/WorkplaceRequest'
import Button from '../Button/Button'
import useSelector from '../../hooks/useSelector'
import useDispatch from '../../hooks/useDispatch'
import { requestsActions } from '../../store/reducers/requests'

const WorkplaceRequestDialog = () => {
	const isModalOpen = useSelector(state => state.requests.isModalOpen)
	const newRequestSuccess = useSelector(state => state.requests.newRequestSuccess)
	const dispatch = useDispatch()

	const { triggerModal, dismissNewRequestSuccess } = requestsActions
	const closeModals = () => {
		dispatch(triggerModal())
		dispatch(dismissNewRequestSuccess())
	}

	if (isModalOpen) {
		return (
			<Fragment>
				<DialogWindow closeDialog={() => dispatch(triggerModal())}>
					<WorkplaceRequest />
				</DialogWindow>

				{newRequestSuccess ? 
					<DialogWindow closeDialog={() => dispatch(dismissNewRequestSuccess())}>
						<h1>Заявка успешно создана</h1>
						<Button text='Закрыть' onClick={closeModals} dull />
					</DialogWindow> :
					<></>
				}
			</Fragment>
		)
	}

	return <></>
}

export default WorkplaceRequestDialog
