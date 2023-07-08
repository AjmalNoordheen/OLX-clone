import './App.css'
import Home from './Pages/Home';
import {Route,Routes} from 'react-router-dom'
import SignUp from './Pages/Signup'
import Login from './Components/Login/Login';
import View from './Components/View/View'
import { useContext, useEffect } from 'react';
import { AuthContext, FirebaseContexts } from './Store/Context';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Create from './Components/Create/Create'
import Post from './Store/postContext';

function App() {
  const {setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContexts)
  const auth = getAuth(firebase)
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })
  })
  return (
    <>
    <Post>
     <Routes>
        <Route path='/' element={<Home/>} />   
        <Route path='/SignUp' element={<SignUp/>} />   
        <Route path='/login' element={<Login/>} />   
        <Route path='/create' element={<Create/>} />   
        <Route path='/view' element={<View/>} />   
     </Routes>
    </Post>
    </>
  )
}

export default App
