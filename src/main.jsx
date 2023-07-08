import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import  {FirebaseContexts} from './Store/Context.jsx'
import {firebase,db} from './firebase/config.jsx'
import Context from './Store/Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <FirebaseContexts.Provider value={{firebase,db}}>
    <BrowserRouter>
     <Context>
       <App />
     </Context>
    </BrowserRouter>
  </FirebaseContexts.Provider >
  </React.StrictMode>,
)
