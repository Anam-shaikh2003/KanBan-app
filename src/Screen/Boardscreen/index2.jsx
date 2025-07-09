import { useState,useEffect } from "react"
import CreateBoard1 from "./CreateBoard1"
import Topbar from "./Topbar"
import Noboards from "./Noboards";
import {Stack,Grid,Typography,Box,IconButton} from '@mui/material'
import BoardCards from "./BoardCards";
import UseApp from "../../Hooks/UseApp";
import Apploader from "../../component/layout/Apploader";
import useStore from '../../store';  
import Addform from "./Addform";


function BoardScreen(){
    const [loading,setloading] = useState(true)
    const [showmodel,setshowmodel] = useState(false); 
    const { boards, areBoardsFetched,uid } = useStore();
    const {fetchBoards} = UseApp()

    useEffect(() => {
    if (uid && !areBoardsFetched) {
      const loadBoards = async () => {
        setloading(true);
        await fetchBoards().finally(() => setloading(false));
      };
       loadBoards(); 
      
    } else {
      setloading(false);
    }
  }, [uid,areBoardsFetched]);
    if(loading) return <Apploader/>
    return(
        <>
        <Topbar openmodel={()=>setshowmodel(true)}/>
        {showmodel && <CreateBoard1 closemodel={()=>setshowmodel(false)}/>}
        {/* <Noboards/> */}
        <Stack sx={{ width: '100%', height: 100 }} >
         <Grid container spacing={{xs:1 , sm:4}}>
            {Array.isArray(boards) && boards.length > 0 ? (
            boards.map((board) => <BoardCards key={board.id} {...board} width={3}/>)
                ) : (
                <Noboards />
                )}
            </Grid>
        </Stack>
       
        </>
    )
}
export default BoardScreen