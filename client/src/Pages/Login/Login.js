import React from 'react';
import '../Signup/SignupStyle.css';
import { useState } from 'react';
import { useLogin } from '../../Hooks/useLogin';
import image from '../../Assets/trip.jpg'
import Navbar from '../../Components/Navbar/Navbar';


const Login = () => {
    
  const initialState = {
    email: "",
    password: ""
  }
    const [ user,setUser] = useState(initialState);
   const {email, password} = user
  

    const {loginData,error} =useLogin();
    

  const loginSubmit = async(e)=>{
    e.preventDefault();
    await loginData(email, password);

    setUser({
      email: "",
      password: ""
    })

    // console.log(email,password)
  }

  const onInputChange = (e) =>{
    const { name, value} = e.target;
  setUser( {...user,  [name]:value })
  }

  return (
    <>
    <Navbar/>
    <section className="container">
          
         <div className='main_info'>

          <h2>Login</h2>

<form  onSubmit={loginSubmit}>

    <div className="field">
        <label>Email :</label>
        <input type="email" onChange={onInputChange} name='email' value={email} />
    </div>

    <div className="field">
        <label>password :</label>
        <input type="password" onChange={onInputChange} name='password'  value={password}/>
    </div>

    <button>Submit</button>

    {error && <div className='error'>{error}</div>}

</form>
</div>

<div className="image">
        <img src={image} alt="image" />
    </div>
    </section>
</>

  )
}

export default Login
