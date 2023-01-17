import React from 'react';
import { useState } from 'react';
import { useSignup } from '../../Hooks/useSignup';
import './SignupStyle.css'
import image from '../../Assets/trip.jpg'
import Navbar from '../../Components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const Navigate = useNavigate()

    const [user, setUser] = useState({
        fname: "",
        lname: "",
        email: "",
        password: ""
    })


    const { signupdata, error } = useSignup();

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const signupSubmit = async (e) => {

        e.preventDefault();
        // console.log(user)
        await signupdata(user);

        setUser({
            fname: "",
            lname: "",
            email: "",
            password: ""
        })

        Navigate("/signUpPopUp")
    }
    return (
        <>
        <Navbar/>
            <section className="container">
                
                <div className='main_info'>
                    {/* <div className='logo_Signup'>
                        <p>Journey</p>
                    </div> */}

                    <h2>Signup</h2>
                    <form onSubmit={signupSubmit}>

                        <div className="field">
                            <label>First Name:</label>
                            <input type="text" onChange={handleChange} name="fname" value={user.fname} />
                        </div>

                        <div className="field">
                            <label>Last Name:</label>
                            <input type="text" onChange={handleChange} name="lname" value={user.lname} />
                        </div>

                        <div className="field">
                            <label>Email :</label>
                            <input type="email" onChange={handleChange} name="email" value={user.email} />
                        </div>
                        <div className="field">
                            <label>passowrd :</label>
                            <input type="password" onChange={handleChange} name="password" value={user.password} />
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

export default Signup;



