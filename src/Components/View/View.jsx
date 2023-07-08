import React ,{useEffect,useState,useContext} from 'react';
import './View.css';
import { postContext } from '../../Store/postContext';
import { FirebaseContexts } from '../../Store/Context';
import { collection,doc ,getDocs,where } from 'firebase/firestore';
function View() {
  const [userDeatils,setUserDetails] = useState()
  const {postDetails} = useContext(postContext)
  const {firebase,db} = useContext(FirebaseContexts)

  useEffect(()=>{
    const fetchdata = async ()=>{
      const querySnapshot = await getDocs(collection(db,'users'),where ("id","==",postDetails.userId))
      querySnapshot.forEach((doc)=>{
        if(doc.data().id==postDetails.userId){
          setUserDetails(doc.data())
        }
      })
     
   
    }
    fetchdata();
  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.imageUrl}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createAt}</span>
        </div>
        {
          userDeatils && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDeatils.name}</p>
          <p>{userDeatils.phone}</p>
        </div>
        }
      </div>
    </div>
  );
}
export default View;
