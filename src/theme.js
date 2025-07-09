import {createTheme} from '@mui/material'

export const colors=[
    "#F49D6E",
    "#E85A4F",
    "#FFD166",
    "#8ABEB7",
    "#2478A8",
    "#D3D3D3"
]

const theme = createTheme({
    palette:{
        mode :"dark",
        background:{
            default:"#1D1F26",
        },
        primary:{
            main:"#BEA4FF"
        }
    },
    components:{
        MuiSnackbar:{
            defaultProps:{
                anchorOrigin:{
                    vertical:'top',
                    horizontal:'center',
                }
            }
        },
        MuiSnackbarContent:{
        styleOverrides:{
            message:{
                fontWeight:600,
                textTransform:"capitalize"
            }
        }
    }
    },
    
    typography:{
        fontFamily:"Lato,sans-serif",
        button:{
            transform:"unset",
            fontWeight:"900",
        }
    },
    shape:{
        borderRadius:0,
    }
})

export default theme