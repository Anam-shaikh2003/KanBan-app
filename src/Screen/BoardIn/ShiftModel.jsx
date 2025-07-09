import {Dialog,Typography,Stack,Chip, Button} from '@mui/material'
import ModelHeader from '../../component/layout/ModelHeader'
import { statusmap } from './BoardInterface'
import { useState } from 'react'

const ShiftModel = ({onclose,task,shift})=>{
    const [taskStatus, setTaskStatus] = useState(task.status)
    return(
        <Dialog open fullWidth maxWidth='xs'>
            <Stack p={2}>
                    <ModelHeader title='Shift Task' onclose={onclose}/>
                    <Stack my={3} spacing={1}>
                        <Stack spacing={2}>
                            <Typography>Task:</Typography>
                            <Typography p={1.5} bgcolor='#45474E'>{task.task}</Typography>
                        </Stack>
                        <Stack>
                        <Typography>status</Typography>
                        <Stack direction='row' spacing={1}>
                            {Object.entries(statusmap).map(([status,label])=>
                            <Chip onClick={()=>setTaskStatus(status)}
                            variant={taskStatus === status ?"filled":"outlined"} label={label}
                             key={status}></Chip>)}
                        </Stack>
                        </Stack>
                    </Stack>
                    <Button onClick={()=>shift(taskStatus)} variant='contained'>Shift Task</Button>
            </Stack>
        </Dialog>
    )

}
export default ShiftModel