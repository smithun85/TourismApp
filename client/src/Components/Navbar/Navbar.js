import React from 'react'
import './NavbarStyle.css'
import {Link, useNavigate} from 'react-router-dom'
import { useLogout } from '../../Hooks/useLogout';
import { useAuthContext } from '../../Hooks/useAuthContext';

function Navbar() {
const { logoutdata } = useLogout();
const { user } = useAuthContext();

const Navigate = useNavigate()

const handleClick = () => {
  logoutdata();
Navigate("/locations")
  
}

  return (

    <nav>   
         <div className='logo'>
         <p><Link to='/'>Journey</Link></p>
         </div> 

        { user && (
            <div className="logout">
          <span>{user.email}</span>
          <button onClick={handleClick}>Logout</button>
        </div>
          ) }
         
         {!user && (
          <div className="auth">
          <Link to='/'>Home</Link>
            <Link to='/locations'>Locations</Link> 
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Register</Link>
         </div>
         )} 

    </nav>
  )
}

export default Navbar
