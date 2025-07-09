import {Stack,Grid,Typography,Box,IconButton} from '@mui/material'
import OpenIcon from '@mui/icons-material/Launch'
import {colors} from '../../theme'
import { useNavigate } from 'react-router-dom'


const BoardCards=({name,color,created,id})=>{
    const createdAt = created?.seconds
  ? new Date(created.seconds * 1000).toLocaleDateString('en-GB')
  : "Unknown";

    const navigate = useNavigate()
    return(
        <Grid  container
        spacing={3}
       >
                <Stack sx={{ width: 320, height: 100 }}  p={2}  bgcolor="background.paper" borderLeft="5px solid" borderColor={colors[color]} >
                    <Stack  direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Box width="50%">
                        <Typography
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        mr={10}
                        fontWeight={400}
                        variant="h6">
                       {name}</Typography></Box>
                        <IconButton onClick={()=>navigate(`/boards/${id}`)} >
                            <OpenIcon size="small" />
                        </IconButton>
                    </Stack>
                     <Typography variant="body2" mb={10} mr={30}>Created:{createdAt}</Typography>
                </Stack>
            </Grid>
    )
}
export default BoardCards