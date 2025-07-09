import {Container,Stack,Button,Typography,TextField} from '@mui/material'
import images from '../../assets/images.png'
import { useState } from 'react'
import {getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth'
import { app } from '../../firebase';
import  useStore  from '../../store';

 

const initform={
    email:'',
    password:''
}

const auth = getAuth(app);
const AuthScreen = ()=>{
   
    const [loading,setloading] = useState(false)
    const [login,setlogin] = useState(true)
    const [form,setform] = useState(initform)
    const {settoaster}= useStore()
    const authtext = login?"Do not have an account?":"Already have an account?"
    const handlecng =(event)=>
        setform((oldform)=>({
            ...oldform,
            [event.target.name]: event.target.value
        }))

        const handlebtn = async()=>{
            try{
                setloading(true)
                
                if(login){
                   await  signInWithEmailAndPassword(auth,form.email,form.password)
                     
                }else{
                    await  createUserWithEmailAndPassword(auth,form.email,form.password)
                }

            }catch(err){
                const msg = err.code.split("auth/")[1].split("-").join(" ");
                settoaster(msg);
                setloading(false)
            }
        }
    
    

    return <Container sx={{
        mb:10,
    }}>
        <Stack mb={4} spacing={6}>
        <img  src={images} alt='kanban'/>
        <Typography  color='rgba(255,255,255,.6)' sx={{cursor:'pointer'}}>
            Visualise your workflow for increase productivity.
            <br/>
            Access your Tasks Anytime,Anywhere
        </Typography>
        </Stack>
        <Stack spacing={2}>
        <TextField type='email' value={form.email} name='email' onChange={handlecng} label='Email'/><br/>
        <TextField type='password' value={form.password} name='password' onChange={handlecng} label='Password'/>
        <Button disabled={loading||!form.email.trim() || !form.password.trim()} size='large' variant='contained' onClick={handlebtn}>
            {login?"Login":"Register"}
            </Button>
        <Typography onClick={()=>{setlogin(o=>!o)}} sx={{cursor:'pointer'}}>
            {authtext}
        </Typography>
        </Stack>
    </Container>
};
export default AuthScreen;