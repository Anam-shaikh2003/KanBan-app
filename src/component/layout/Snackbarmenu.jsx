import {Snackbar} from '@mui/material'
import useStore from '../../store'; 

const Snackbarmenu=()=>{
      const {toaster,settoaster}= useStore()
      return(
        <Snackbar message={toaster} open={!!toaster}
        autoHideDuration={5000} onClose={()=>settoaster("")}
       
        />
      )
}

export default Snackbarmenu