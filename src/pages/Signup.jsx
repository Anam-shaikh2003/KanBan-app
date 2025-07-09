import React,{useState}  from "react";
import {app} from '../firebase'
import {getAuth, createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup} from 'firebase/auth'

const auth=getAuth(app);
const provider = new GoogleAuthProvider();

export function Signup(){
    const[email,setemail]=useState("");
    const[password,setpassword]=useState("");
   
    const createuser = ()=>{
        createUserWithEmailAndPassword(auth,email,password).then(value=>alert("success"));
    }
    const signinwithgoogle=()=>{
        signInWithPopup(auth,provider)
    }

    return(
        <div className="signupContainer">
            <label>Email:</label>
            <input type="email" placeholder="enter email" value={email} onChange={(e)=>setemail(e.target.value)}/>
            <label>Password:</label>
            <input type="password" placeholder="enter password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
            <button onClick={createuser}>Signup</button>
            <button onClick={signinwithgoogle}>signup with google</button>
        </div>
    )
}