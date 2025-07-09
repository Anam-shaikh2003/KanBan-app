import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"
import BackIcon from '@mui/icons-material/ArrowBack';

const BoardNotReady = ()=>{
    const navigate = useNavigate();
    return(
    <Stack textAlign="center" alignItems="center" mb={25}>
            <Typography variant="h5">Seems like your board are not ready</Typography>
            <Typography>Sometime it may take a few second for the board to be ready for use.
                <br/>Try again in a few seconds.
            </Typography>
            <Button startIcon={<BackIcon/>}
            onClick={()=> navigate("/boards")}
            variant="contained"
            >Go back</Button>

        </Stack>
    )
}
export default BoardNotReady