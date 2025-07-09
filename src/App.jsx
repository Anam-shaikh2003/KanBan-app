import './App.css'
import {CssBaseline, ThemeProvider} from '@mui/material'
import theme from './theme'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import AuthScreen from './Screen/AuthScreen/Index'
import {getAuth,onAuthStateChanged} from 'firebase/auth'
import {app} from './firebase';
import {getFirestore} from 'firebase/firestore'
import { useEffect } from 'react'
import useStore from './store'
import Apploader from './component/layout/Apploader'
import BoardScreen from './Screen/Boardscreen/index2'
import PublicOnlyRouter from './component/utils/PublicOnlyRouter'
import PrivateOnlyRouter from './component/utils/PrivateOnlyRouter'
import Snackbarmenu from './component/layout/Snackbarmenu'
import IndexB from './Screen/BoardIn/IndexB'


const auth = getAuth(app);
const firestore = getFirestore(app);

function App() {

  const {loader,setLoginState}= useStore();
    console.log(loader);

   useEffect(()=>{
      const users = onAuthStateChanged(auth,(user)=>{
        setLoginState(!!user)
      })
      return ()=> users();
  },[])

  if(loader) return <Apploader/>

 return (
  <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Snackbarmenu/>

    <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <PublicOnlyRouter>
            <AuthScreen />
          </PublicOnlyRouter>
        }
      />
      <Route path='/boards'element={<PrivateOnlyRouter Component={BoardScreen}/>}/>
      <Route path='/boards/:boardId'element={<PrivateOnlyRouter Component={IndexB}/>}/>
      <Route path='*' element={<Navigate to="/" replace/>}/>
       
    </Routes>
    </BrowserRouter>
  </ThemeProvider>
 )
}
  export default App
