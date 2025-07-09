import { useNavigate, useParams } from "react-router-dom"
import BoardInterface from "./BoardInterface"
import BoardTop from "./BoardTop"
import  useStore  from "../../store"
import { useCallback, useEffect, useMemo, useState } from "react"
import UseApp from "../../Hooks/UseApp"
import Apploader from "../../component/layout/Apploader"
import BoardNotReady from "./BoardNotReady"

const IndexB = ()=>{
    const [data,setdata] = useState(null)
    const [loading,setloading]= useState(true)
    const [lastupdate,setlastupdate] =  useState(null)
    const navigate = useNavigate()
    const {boards,areBoardsFetched}= useStore()
    const {fetchBoard,deleteBoard} = UseApp();
    const {boardId} = useParams()
    const board = useMemo(()=>boards.find((b)=>b.id === boardId),[])
    const boardData = useMemo(()=> data,[data])
    console.log({data,lastupdate,loading})
    

    const handleDelete = useCallback (async()=>{
      if(!window.confirm("Do you want to delete this board? ")) return;
      try{
        setloading(true);
        await deleteBoard(boardId)

      }catch(err){
        console.log(err)
        setloading(false);
      }
    },[])

     const handleupdate = useCallback(() => {
          setlastupdate(new Date().toLocaleString("en-US"));
      }, []);
    const handlefetchboard = async()=>{
        try{
            const boardData = await fetchBoard(boardId)
            if(boardData) {
              const {lastupdate,tabs} = boardData
               setdata(tabs)
               setlastupdate(lastupdate.toDate().toLocaleString("en-US"));
            }
            setloading(false)

        }catch(err){
            console.log(err)
        }
    }
    
   useEffect(() => {
  if (!areBoardsFetched || !board) {
    navigate('/boards');
  } else {
    handlefetchboard();
  }
}, []);

   if (!board) return null;
   if(loading) return <Apploader/>
   if(!data) return <BoardNotReady/>
    return(
        <>
      <BoardTop name={board.name} color={board.color} lastupdate={lastupdate} deleteBoard={handleDelete}/>
      <BoardInterface boardData={boardData} boardId={boardId} updatelast={handleupdate} />
        
        </>
        
    )
}
export default IndexB