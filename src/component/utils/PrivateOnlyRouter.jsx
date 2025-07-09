import {Navigate} from 'react-router-dom'
import useStore from '../../store'

const PrivateOnlyRouter=({Component})=>{
        const {isLoggedIn} = useStore();
        return !isLoggedIn? <Navigate to='/' replace/>:<Component/>
}
export default PrivateOnlyRouter