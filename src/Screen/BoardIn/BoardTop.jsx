import { memo } from 'react'
import {AppBar,Stack,Typography,Toolbar,IconButton} from '@mui/material'
import BackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import { colors } from '../../theme'

const BoardTop=({name,lastupdate,color,deleteBoard})=>{
    const navigate = useNavigate()
   
return(
    <AppBar sx={{
        borderBottom:"5px solid",
        borderColor:colors[color]
    }}>
        <Toolbar sx={{justifyContent:"space-between"}}>
            <Stack spacing={1} direction='row'>
                <IconButton onClick={()=>navigate('/boards')} size='small'><BackIcon/></IconButton>
                <Typography alignItems='center' variant='h6'>{name}</Typography>
            </Stack>
            <Stack spacing={1} direction='row'>
                <Typography alignItems='center' variant='body' display={{
                    xs:'none',
                    sm:'block'
                }}>Last update:{lastupdate || "Not available"}</Typography>
                <IconButton size='small' onClick={deleteBoard}><DeleteIcon/></IconButton>
            </Stack>
        </Toolbar>
    </AppBar>
)
}
export default memo(BoardTop)