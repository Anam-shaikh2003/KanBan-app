import {AppBar,Toolbar,Button,Stack,useMediaQuery, IconButton} from '@mui/material'
import Logo from '../../assets/Logo.png'
import  LogoutIcon from '@mui/icons-material/ExitToApp'
import  CreateBoardIcon from '@mui/icons-material/AddCircle'
import {signOut} from 'firebase/auth'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'

const Topbar=({openmodel})=>{
    const navigate = useNavigate()
    const iXs = useMediaQuery(theme=>theme.breakpoints.only('xs'))
    console.log(iXs);
    return (
        <AppBar >
            <Toolbar sx={{justifyContent:'space-between'}}>
                <img height="35px" src={Logo} alt='logo'/>
                <Stack direction="row" spacing={2}>
                   {iXs?(<><IconButton onClick={openmodel} ><CreateBoardIcon/></IconButton>
                   <IconButton onClick={()=> signOut(auth)}><LogoutIcon/></IconButton>
                   </>):
                    (<>
                    <Button onClick={openmodel} variant='contained'>Create Board</Button>
                    <Button
                    onClick={()=> signOut(auth)}
                    startIcon={<LogoutIcon/>}
                    color='inherit'>Logout</Button></>)}
                </Stack>
            </Toolbar>
        </AppBar>
    )
}
export default Topbar