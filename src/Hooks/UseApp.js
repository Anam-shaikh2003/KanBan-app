import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, getDoc, doc,updateDoc,setDoc,deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import useStore from '../store';
import { useNavigate } from 'react-router-dom';

const UseApp = () => {
  const navigate = useNavigate()
  const {boards, setBoards,setAreBoardsFetched,settoaster } = useStore.getState();
  const auth = getAuth();
  const user = auth.currentUser;

  const deleteBoard= async(boardId)=>{
    try{
      const docRef = doc(db,`users/${uid}/boards/${boardId}`);
      await deleteDoc(docRef)
      const tBoard = boards.filter(board => board.id !== boardId)
      setBoards(tBoard);
      navigate("/boards")

    }catch(err){
      settoaster("error deleting the board");
      throw err;
    }
  }

  if (!user) {
    console.error('User not authenticated');
    return;
  }

  const uid = user.uid;
  const boardsColRef = collection(db, `users/${uid}/boards`);

  const updateBoardData = async(boardId,tabs)=>{
    const docRef = doc(db,`users/${uid}/boardsData/${boardId}`);
    try{
      await setDoc(docRef,{tabs, lastupdate: serverTimestamp()}, { merge: true });

    }catch(err){
      console.log(err)
    }
  }

  const fetchBoard = async (boardId) => {
  try {
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    const docSnap = await getDoc(docRef);
     console.log("docSnap.exists():", docSnap.exists());
     
    if (docSnap.exists()) {
      const data = docSnap.data(); 
      return data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

  const fetchBoards = async () => {
    try {
       
      const q = query(boardsColRef, orderBy('created', 'desc'));
      const querySnapshot = await getDocs(q);

      const boards = querySnapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      

      setBoards(boards);
      
    setAreBoardsFetched(true);
    } catch (err) {
      console.error('Error fetching boards:', err);
    }
  };

  const createBoard = async ({ name, color }) => {
    try {
      const boardRef = await addDoc(boardsColRef, {
        name,
        color,
        created: serverTimestamp(),
      });
      const boardId = boardRef.id;
     const initialBoardData = {
      lastupdate: serverTimestamp(),
  tabs: {
    todo: [],
    Progress: [],
    completed:[]
  },
};
      await setDoc(doc(db, `users/${uid}/boardsData/${boardId}`), initialBoardData);

      await fetchBoards();
    } catch (err) {
      
      throw err;
    }
  };

  return { createBoard, fetchBoards, fetchBoard ,updateBoardData,deleteBoard};
};

export default UseApp;
