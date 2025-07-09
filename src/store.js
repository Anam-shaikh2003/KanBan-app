import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
const store = (set)=>({
    
    loader:true,
    isLoggedIn:false,
    boards :[],
    areBoardsFetched:false,
    toaster:"",
    settoaster:(toaster)=> set({toaster},false,"settoaster"),
  setBoards: (boards) => set({ boards,areBoardsFetched: true  }, false, "setBoards"),
   setAreBoardsFetched: (value) => set({ areBoardsFetched: value }, false, "setAreBoardsFetched"),
    setLoginState: (status) => {
    console.log('Setting login state:', status);
    set(
      {
        isLoggedIn: status,
        loader: false,
      },
      false,'setLoginState'
    );
  },
});

const useStore = create(devtools(store));
export default useStore;