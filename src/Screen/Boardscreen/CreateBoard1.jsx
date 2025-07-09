import {Dialog,Stack,Typography,Box ,Button, TextField} from '@mui/material'
import ModelHeader from '../../component/layout/ModelHeader'
import { colors } from '../../theme'
import { useState } from 'react'
import UseApp from '../../Hooks/UseApp'
import  useStore  from '../../store'

const CreateBoard1=({closemodel})=>{
    const {createBoard} = UseApp()
    const [name,setname] = useState("");
    const [color,setcolor]= useState(0);
    const [loading,setloading]=useState(false)
    const {settoaster}=useStore();

    const handlecreate=async()=>{
        if(!name.trim()) return settoaster("You need to enter board name");
        if(/^[a-zA-Z0-9\s]{1-20}$/.test(name.trim())) return settoaster("Board name cannot be more than 20 character also not contain special character");
        try{
            setloading(true);
            await createBoard({name,color});
            closemodel();
        }catch(err){
            setloading(false)
            console.log(err)
        }
    }
    
    return(
       <Dialog open onClose={closemodel} fullWidth maxWidth="xs" >
        <Stack p={2} >
         <ModelHeader onclose={closemodel} title="Create Board"/>
         <Stack my={5} spacing={3}>
            <TextField value={name} onChange={(e)=>setname(e.target.value)} label="Board name"/>
            <Stack spacing={1.5} direction='row'>
                <Typography>Color:</Typography>
                    {colors.map((clr,idx)=>(<Box
                    sx={{
                        cursor:'pointer',
                        border: color===idx ? "2px solid #383838":"none",
                        outline:`2px solid ${clr}`
                    }}
                    onClick={()=>setcolor(idx)}
                    key={clr}
                    height={25}
                    width={25}
                    backgroundColor={clr}
                    borderRadius="50%"
                    />))}
            </Stack>
         </Stack>
         <Button disabled={loading} onClick={handlecreate} size='large' variant='contained'>Create</Button>
        </Stack>
       </Dialog>
    )

}
export default CreateBoard1