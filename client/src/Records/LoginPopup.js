import React from 'react'
import { Link } from 'react-router-dom'
import './RecordStyle.css'

const LoginPopup = () => {
  return (
    <div className="popup">
        <div className='signUpPopUp'>
            <h2>Please Login first</h2>   
            <h3><Link to='/Login'>ok</Link></h3>
        </div>
</div>
  )
}

export default LoginPopup