import {Stack,Typography,IconButton} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit';
import {Draggable} from 'react-beautiful-dnd'
import Editboard from './Editboard'

const Task=({id,task,removeTask,index,onClick})=>{
    
    return(
        <Draggable draggableId={id} index={index}>
        {(provided)=><Stack onClick={onClick} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} direction="row" alignItems='center' spacing={1}  >
            <Typography width='100%'  p={1} border='1px solid' borderColor='#777980' bgcolor='#45474E'>{task}</Typography>
            <IconButton sx={{mr:2}} >
                <DeleteIcon onClick={removeTask} />
            </IconButton>
            <Editboard/>
        </Stack>}
        </Draggable>

    )
}
export default Task