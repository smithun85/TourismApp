import React, { useContext, useEffect, useState } from 'react'
import LocationMap from './LocationMap';
import "./ViewmoreStyle.css";
import Reviews from './Reviews/Reviews';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar';
import {Data} from '../../Context/TourContext'
import SetReviews from './Reviews/SetReviews';
import Slider from './Reviews/Slider';


const Viewmore = () => {

    // context
    const {reviewData,toggleUpdateTour} = useContext(Data)
    
   let arr =[]
    reviewData.map((item)=>{
      const {tourId} = item
      arr.push(tourId)
    })  
    // console.log(arr);
    
    
    //navigate to locations page
    const Navigate = useNavigate()

    const [view, setView] = useState([]);
    
    //user token
    const userToken = JSON.parse(localStorage.getItem("user"));  //setItem() from useSingup.js
    const { token, Result } =userToken
    const config = {
        headers: {
            Authorization : ` Bearer ${token}`
        }
    }
   
//get single Data by id
    const View = async () => {
        const id = JSON.parse(localStorage.getItem("records"))       //tour's id
        // console.log(id)
        const res = await fetch(`http://localhost:4000/tours/${id}`)
        const singledata = await res.json()
        setView([singledata]);
        // console.log(singledata,444)
    }
    useEffect(() => {
        View()
    }, []);


    //DELETE the  ImageDetails
  const deleteImageDetails = async (_id)=>{
     await axios.delete(`http://localhost:4000/tours/${_id}`,config)
     View()
     Navigate('/locations')
}

    
    return (
       <>
         <Navbar/>
        <section className="view_first_div">
            {
                view.map((item,i) => {
                    const { title, description, price, imageUrl:{image}, _id,userIdForTour, latLong: { coordinates: [a, b] } } = item
                    {/* console.log(_id,222) */}
                    return (
                        <div className='card_view' key={_id}>

                            <div className="imageDetails">
                                <div className="image_card_view">
                                    <Slider className='slider-image' img={image}/>
                                </div>
                                <div className='text_card_view'>
                                    <h2 style={{ color: "black" }}>{title}</h2>
                                    <p>{description}</p>
                                    <p><b>Price: </b>${price}</p>
                                   {Result._id===userIdForTour ? (<div>
                                        <button className='view_card_btn1' onClick={() =>{
                                            toggleUpdateTour(item)
                                            Navigate("/AddLocation")}
                                            }>Edit
                                        </button>
                                        <button className='view_card_btn2' onClick={()=>deleteImageDetails(item._id)}>Delete</button>
                                    </div>):""}
                                </div>
                            </div>



                            <div className="view_location_map">

                                <LocationMap lag={a} lat={b} />

                                <Reviews/> 

                                <SetReviews tour_id={_id}/>                                
                            </div>

                        </div>
                    )
                }
                )
            }

        </section>
       </>

    )
}
export default Viewmore;

