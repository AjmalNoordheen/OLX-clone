import React, { useContext, useState } from 'react';
import Logo from '../../../assets/images/olx-logo.svg';
import './Signup.css';
// import { db } from '../../firebase/config';
import {getAuth,createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { addDoc,collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FirebaseContexts } from '../../Store/Context';

export default function Signup() {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword] = useState('')
  const navigate =useNavigate()

  const {firebase,db} = useContext(FirebaseContexts)
  const auth = getAuth(firebase)

  const handleSubmit=(e)=>{
     e.preventDefault()
     console.log(firebase);
    
console.log(auth);
     createUserWithEmailAndPassword(auth,email,password).then((result)=>{
      const user = result.user;
      updateProfile(user,{
        displayName:name
      }).then(()=>{
        addDoc(collection(db,"users"),{
          id:result.user.uid,
          email:email,
          password:password,
          phone:phone,
          name:name
        }).then(()=>{
          navigate('/login')
        })
      })
     })
     
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e)=>{setPhone(e.target.value)}}/>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}/>
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
