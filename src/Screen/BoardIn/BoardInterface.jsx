import {Grid, Stack,Typography,IconButton,Box} from '@mui/material'
import BorderTap from './BorderTap'
import Addboard from './Addboard'
import { useCallback, useState } from 'react'
import UseApp from '../../Hooks/UseApp'
import  useStore  from '../../store'
import {DragDropContext} from 'react-beautiful-dnd'
import Apploader from '../../component/layout/Apploader'
import ShiftModel from './ShiftModel'
import Editboard from './Editboard'

export const statusmap={todo:"Todos",Progress:"In Progress",completed:"Completed"}

const sleep = (ms=1000) => new Promise(r=>setTimeout(r,ms))

const BoardInterface=({boardData,boardId,updatelast})=>{
  const [loading,setloading] = useState(false)
  const [shift,setShift] = useState(null);
   const [addtask,setaddtask] = useState("");
    const [tabs, setTabs] = useState({
    todo: boardData?.todo || [],
    Progress: boardData?.Progress || [],
    completed: boardData?.completed || [],
  });
  const {updateBoardData} = UseApp()
  const {settoaster} = useStore();

  const handleOpenTask=useCallback((status)=>setaddtask(status),[])

   const handleOpenShift=useCallback((task)=>setShift(task),[])
   console.log({shift})

   const handleShiftTask = async(newstatus) =>{
    const oldstatus = shift.status
    if(newstatus===oldstatus) return setShift(null);
      const cloneTab = structuredClone(tabs)

      const [task] = cloneTab[oldstatus].splice(shift.index,1)
      cloneTab[newstatus].unshift(task);
      try{
        setloading(true)
         await updateBoardData(boardId,cloneTab);
        setTabs(cloneTab)
         updatelast()
         settoaster("board updated!")
         setShift(null)
      }catch(err){
        console.log(err);
      }finally{
        setloading(false)
       }
    }


  const handleRemoveTask = useCallback((tab,taskId)=>{
      const cloneTab = structuredClone(tabs)
      const taskIdx = cloneTab[tab].findIndex(t=> t.id === taskId)
      
      if (taskIdx !== -1) {
    cloneTab[tab].splice(taskIdx, 1);
      }
      try{
        setloading(true)
         updateBoardData(boardId,cloneTab);
        setTabs(cloneTab)
         updatelast()
         settoaster("board updated!")
      }catch(err){
        console.log(err);
      }finally{
        setloading(false)
      }
  },[tabs, boardId])

  const handleTask = async(task)=>{
       if(!task.trim()) return settoaster("task cannot be empty!");
       const cloneTab = structuredClone(tabs)
        cloneTab[addtask].unshift({task,id:crypto.randomUUID()})
        try{
            setloading(true);
            await updateBoardData(boardId,cloneTab)
            setaddtask('')
            setTabs(cloneTab)
            updatelast()
            settoaster("board updated!")
        }catch(err){
          console.log(err);
        }finally{
          setloading(false)
        }
  }

  const handleDnD =async({source,destination})=>{
      if(!destination) return;
      if(source.droppableId===destination.droppableId && source.index === destination.index) return;
      const cloneTab = structuredClone(tabs)
      const [dragTask] = cloneTab[source.droppableId].splice(source.index,1)
      cloneTab[destination.droppableId].splice(destination.index,0,dragTask)

      try{
        setloading(true)
         await updateBoardData(boardId,cloneTab);
        setTabs(cloneTab)
         updatelast()
         settoaster("board updated!")
      }catch(err){
        console.log(err);
      }finally{
        setloading(false)
      }
  }
  if(loading) return <Apploader/>

    return (
    <>
    {/* {!!shift && (<ShiftModel task={shift} shift={handleShiftTask} statusmap={statusmap} onclose={()=>setShift(null)}/>)} */}
    {!!addtask && <Addboard tabname={statusmap[addtask]} onClose={()=> setaddtask("")} addtask={handleTask}/>}
     
    <Box sx={{ flexGrow: 1 , px: 2, py: 3 }} >
    <DragDropContext onDragEnd={handleDnD}>
    <Grid container
    spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{
    justifyContent: "flex-start",
    alignItems: "flex-start",
  }}>
     {Object.keys(statusmap).map((status)=>(<BorderTap  key={status} status={status} size={{ xs: 2, sm: 4, md: 4 }}
     name={statusmap[status]} tasks={tabs[status]}
      openTask={handleOpenTask} removeTask={handleRemoveTask}
      openShift={handleOpenShift}
      />))}
    
    </Grid>
    </DragDropContext>
    </Box>
    
    </>
    )
}
export default BoardInterface