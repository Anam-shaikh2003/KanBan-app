import {memo} from 'react'
import {Grid, Stack,Typography,IconButton} from '@mui/material'
import AddIcon from '@mui/icons-material/AddCircle'
import Task from './Task'
import Droppable from '../../component/utils/DragTask'

const BorderTap=({name,status,tasks = [],openTask,removeTask,openShift })=>{
    console.log("tab:",name);
    return<>
    <Droppable droppableId={status}>
    {(provided)=> <Grid {...provided.droppableProps} ref={provided.innerRef} display={{xs:12,sm:6}}  >
                <Stack sx={{width:300}}  p={2}  bgcolor="#000">
                    <Stack direction='row'alignItems='center' justifyContent='space-between'>
                        <Typography fontWeight={500} variant='h6'>{name}</Typography>
                        <IconButton onClick={()=>openTask(status)}><AddIcon/></IconButton>
                    </Stack >
                    <Stack spacing={2} >
                   {tasks.map((task,index)=>(
                   <Task key={task.id} task={task.task} id={task.id}
                    removeTask={()=>removeTask(status,task.id)}
                    index={index} 
                    onClick={()=>openShift({task:task.task,index:index , status:status})}
                    />))}
                </Stack>
                {provided.placeholder}
                </Stack>
                
        </Grid>}
        </Droppable>

    </>
}
export default memo(BorderTap)