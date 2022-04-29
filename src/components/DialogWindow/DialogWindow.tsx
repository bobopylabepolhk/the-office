import React, { ReactChild } from 'react'
import FocusTrap from 'focus-trap-react'
import IconBtn from '../IconButton/IconButton'
import X from './x.svg'
import './DialogWindow.css'

interface Props {
	children: ReactChild | ReactChild[],
	closeDialog: () => void
}

const DialogWindow = ({ children, closeDialog } : Props) => {
	return (
		<FocusTrap>
			<div className='dialog'>
				<div className='dialog__container'>
					<IconBtn className='dialog__close' icon={X} alt='ЗАКРЫТЬ' onClick={closeDialog} />
					{children}
				</div>
			</div>
		</FocusTrap>
	)
}

export default DialogWindow
