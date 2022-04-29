import { useDispatch } from 'react-redux'
import { MyDispatch } from '../store'

const useTypedDispatch = () => useDispatch<MyDispatch>()

export default useTypedDispatch
