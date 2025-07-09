import {  useEffect, useState } from "react"
import { Droppable } from "react-beautiful-dnd";

const DragTask=({children,...props})=>{
    const [enable,setEnable] = useState(false);
    useEffect(()=>{
        const animation = requestAnimationFrame(()=>setEnable(true));

        return ()=>{
            cancelAnimationFrame(animation);
            setEnable(false)
        }
    },[])

    if(!enable) return null;
    return <Droppable {...props}>{children}</Droppable>
}
export default DragTask