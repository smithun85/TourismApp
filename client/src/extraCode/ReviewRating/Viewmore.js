import React, { useEffect, useState, useContext } from 'react'
import LocationMap from './LocationMap';
import "./ViewmoreStyle.css";
import { FaStar } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";

import axios from 'axios';
import { Data } from '../../Context/TourContext';
import { useAuthContext } from '../../Hooks/useAuthContext';


const Viewmore = () => {

   //GET reviews API
 const [reviewData,setReviewData]  = useState([])
    const getReview = async () => {
        const response = await axios.get(`http://localhost:4000/reviews`)
        const data = response.data.reviews;
        console.log(response)
        setReviewData([data])       
    }


    useEffect(() => {
        getReview()
    }, ["http://localhost:4000/reviews"]);
 console.log(reviewData)


    const [view, setView] = useState([]);
    const [rating, setRating] = useState("");
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [submit, setSubmit] = useState([]);
    // console.log(submit)

    const DataSubmit = () => {
        // console.log("submitdata")
        setSubmit((olditem) => {
            return [...olditem, text, name];

        });
        setText("");
        setName("");
    }


   

    const View = async () => {
        const id = JSON.parse(localStorage.getItem("viewmore"))
        // console.log(id)
        const res = await fetch(`http://localhost:4000/tours/${id}`)
        const singledata = await res.json()
        setView([singledata]);
        // console.log(singledata)

    }
    useEffect(() => {
        View()
    }, []);
    

        

// post review
//     const [review, setReview] = useState({
//         userId: "",
//         name: "",
//         review: "",
//         rating: ""
//     })

//     const { viewmoredata, error } = useSignup();

    const handleSubmit = (e)=>{
//         e.preventSefault();
        
    
//         await signupdata(user);

// setUser({
//     fname: "",
//     lname: "",
//     email: "",
//     password: ""
// })
    }

   
  

    return (

        <section className="view_first_div">
            {
                view.map((item) => {
                    const { title, description, imageUrl, price, _id, latLong: { coordinates: [a, b] } } = item
                    return (
                        <div className='card_view' key={_id}>
                        
                            <div className="imageDetails">
                                <div className="image_card_view">
                                    <img src={imageUrl} alt='' width={600} height={350} />
                                </div>

                                <div className='text_card_view'>
                                    <h2 style={{ color: "black" }}>{title}</h2>
                                    <p>{description}</p>
                                    <p>{price}</p>
                                    <div>
                                        <button className='view_card_btn1'>Edit</button>
                                        <button className='view_card_btn2'>Delete</button>
                                    </div>
                                </div>
                            </div>



                            <div className="view_location_map">

                                <LocationMap lag={a} lat={b} />

                                <div className='view_rating_div'>

                                    <div className="rating">
                                        <h3 >Location Rating Score</h3>
                                        <div className='stars'>
                                            {[...Array(5)].map((star, i) => {
                                                const ratingValue = i + 1;
                                                return (
                                                   <form onSubmit={handleSubmit}>
                                                    <label >
                                                            <input
                                                                type="radio"
                                                                name='rating'
                                                                value={ratingValue}
                                                            />
                                                            <FaStar
                                                                className='star'
                                                                size={35}
                                                                color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                                                                onClick={() => setRating(ratingValue)
                                                                }
                                                            />
                                                        </label>
                                                   </form>
                                                )
                                            })}
                                        </div>
                                        <p>  {rating} out of 5</p>
                                    </div>

                                    <div className='review'>
                                        <label> Write Review</label> <br />
                                        <textarea
                                            type="text"
                                            className='textArea'
                                            value={text}
                                            onChange={(e) => { setText(e.target.value) }}
                                        />
                                        <button onClick={DataSubmit} >Submit</button>


                                        <div className='top_Reviews'>
                                            <p>Top Review</p>
                                            <div className='writeReviews'>
                                                {
                                                   reviewData.map((item,i) => {
                                                    const {review,rating} = item;
                                                    console.log(item)
                                                    console.log(item.review)
                                                    
                                                   
                                                        return (
                                                            <>
                                                                <p style={{ color: "red" }} > {review} </p>
                                                                <p><b>Rating:</b> {rating}  out of 5 </p>
                                                            </>
                                                        )
                                                    })
                                                }

                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    )
                }
                )
            }

        </section>

    )
}
export default Viewmore;

