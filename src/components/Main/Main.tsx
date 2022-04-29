import React, { useEffect } from 'react'
import enforceAuth from '../../hoc/enforceAuth'
import WorkplaceCard from '../WorkplaceCard/WorkplaceCard'
import WorkplaceRequestDialog from '../WorkplaceRequestDialog/WorkplaceRequestDialog'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import useSelector from '../../hooks/useSelector'
import useDispatch from '../../hooks/useDispatch'
import { fetchWorkplaces } from '../../store/action-creators/workplaces'
import './Main.css'

const Main = () => {
	const workplaces = useSelector(state => state.workplaces.workplaces)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchWorkplaces())
	}, [dispatch])

	return (
		<div className='main'>

			<WorkplaceRequestDialog />

			<Header />
			<main className='main__workplaces'>
				<h1>Рабочие места</h1>
				<div className='card-container'>
					{workplaces.map(workplace => <WorkplaceCard key={workplace.id} {...workplace} />)}
				</div>
			</main>
			
			<Footer />
		</div>
	)
}

export default enforceAuth(Main) 
