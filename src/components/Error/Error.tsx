import React from 'react'
import './Error.css'

interface Props {
	className?: string
	errorMessage: string
}

const Error = ({ className, errorMessage } : Props) => {
	return (
		<div className={`error ${className ? className : ''}`}>
			<div className='error-icon'>
				<svg version="1.1" viewBox="0 0 752 752" xmlns="http://www.w3.org/2000/svg">
					<g>
						<path d="m313.25 224.46-88.793 88.793v125.5l88.793 88.797h125.5l88.797-88.797v-125.5l-88.797-88.793zm185.88 202.55-72.125 72.125h-102.01l-72.125-72.125v-102.01l72.125-72.125h102.01l72.125 72.125z"/>
						<path d="m361.79 304.96h28.414v75.773h-28.414z"/>
						<path d="m361.79 418.62h28.414v28.414h-28.414z"/>
					</g>
				</svg>
			</div>
			<p className='error__paragraph'>{errorMessage}</p>
		</div>
	)
}

export default Error