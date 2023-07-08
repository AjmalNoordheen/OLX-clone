import React, { useContext } from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContexts } from '../../Store/Context';
import { getAuth } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
function Header() {
  const {user}= useContext(AuthContext)
  const {firebase} = useContext(FirebaseContexts)
  const auth = getAuth(firebase)
  const navigate=useNavigate()
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="">
          <span>{user ?'Welcome'+' '+ user.displayName : <Link style={{textDecoration:'none'}} to={'/login'}>Login</Link> }</span>
        </div>
        {user && <span onClick={()=>{
          auth.signOut()
          navigate('/login')
        }}>Logout</span> }

        <div className="sellMenu">
          <SellButton></SellButton>
          <div onClick={()=>{
            navigate('/create')
          }} className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
