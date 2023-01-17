import React from 'react'
import './SignupStyle.css'
import { Link } from 'react-router-dom'

const SignUpPopUp = () => {
  return (
    <div className="popup">
        <div className='signUpPopUp'>
        <h2>Registered Successfully</h2>
        <p>Please Login first</p>
        <h3><Link to='/Login'>ok</Link></h3>
        </div>
    </div>
  )
}

export default SignUpPopUp