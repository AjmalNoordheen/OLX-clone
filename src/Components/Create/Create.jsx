import React, { Fragment, useState ,useContext} from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContexts } from '../../Store/Context';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  
  const [name,setName] = useState('')
  const [category,setcategory] = useState('')
  const [price,setprice] = useState('')
  const [image,setimage] = useState('')

  const {firebase,db} = useContext(FirebaseContexts)
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit= async(e)=>{
    e.preventDefault()
    const storage = getStorage(firebase)
    const imageRef = ref(storage,`/images/${image.name}`);
        await uploadBytes(imageRef,image);
        const imageUrl = await getDownloadURL(imageRef);
        console.log(imageUrl);
        const firestore = getFirestore(firebase)
    await addDoc(collection(db,'products'),{
      name:name,
      category:category,
      price:price,
      imageUrl,
      userId:user.uid,
      createdAt:new Date().toDateString()
    }) 
       
    navigate('/')
   }
  
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form >
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e)=>{
                setName(e.target.value)
              }}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=>{
                setcategory(e.target.value)
              }}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" 
            name="Price" 
            value={price}
            onChange={(e)=>{
              setprice(e.target.value)
            }}/>
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image): ""}></img>
          <form>
            <br />
            <input type="file"  onChange={(e)=>{
              setimage(e.target.files[0])
            }}/>
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
