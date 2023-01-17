import React, {useState, useEffect, useContext } from 'react';
import './RecordStyle.css'
import { Data } from '../Context/TourContext'
import Navbar from '../Components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import Locations from './Locations';
import { MdLocationOn } from 'react-icons/md'
import LoginPopup from './LoginPopup';

function Records() {

    const {
        tours,
        getTours,
    } = useContext(Data)
    
    // console.log(tours,1111)
    //Get Request function display:
    useEffect(() => {
        getTours();
    }, []);
    

    // console.log(tours[0].imageUrl.image[0])

    return (
        <>
            <Navbar />

            <Locations />

            <div className='btns'>              
                <Link to='/AddLocation'>Add new locations</Link>                
            </div>

            <div className='tours'>
                {tours && tours.map((item,i) => {
                    const {_id, title, imageUrl, location, price,description} = item
                    return (
                        <div className="record">

                            <div className="imageUrl">
                                <img src={imageUrl.image[0]} alt="image" />
                            </div>

                            <div className="title">
                                <h3>{title}</h3>

                                <Link to='/Viewmore' className='locationLink'>
                                    <MdLocationOn style={{ color: "red" }} />
                                    <p>{location}</p>
                                </Link>

                                <p>Price:{price}</p>
                                <p>{description.substring(0,40)}...</p>

                                <Link to='/Viewmore' className='viewLink'
                                    onClick={() => { 
                                        localStorage.setItem("records", JSON.stringify(_id));}}>view more
                                </Link>
                            </div>

                        </div>
                    )
                })
                }
            </div>
        </>
    )
}

export default Records