import {Dialog,Stack,Typography,Box ,IconButton} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const ModelHeader=({title,onclose})=>{
    return(
        <Stack direction="row" justifyContent="space-between">
        <Typography fontWeight={700} variant='h6'>{title}</Typography>
        <IconButton onClick={onclose} size='small'>
            <CloseIcon/>
        </IconButton>
        </Stack>
    )
}
export default ModelHeader