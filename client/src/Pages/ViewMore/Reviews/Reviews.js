import axios from 'axios';
import React, { useState,useEffect, useContext } from 'react'
import { Rating } from 'react-simple-star-rating';
import {Data} from '../../../Context/TourContext'


const Reviews = () => {

  const {getReview,refresh, updateReviews,setUpdateReviews,edit,setEdit} = useContext(Data);

  const tourItemId = JSON.parse(localStorage.getItem("records"))
  const userToken = JSON.parse(localStorage.getItem("user"));  //setItem() from useSingup.js
  const { token } =userToken
  // console.log(token,10)


  const [reviewsData, SetReviewsData,] = useState({
    review: "",
    rating:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetReviewsData({
      ...reviewsData,
      [name]: value
    })
  }

  //Rating
  const [rating, setRating] = useState(1)
  const handleRating = (rate) => {
    setRating(rate)
  };


//POST the Review & Rating

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newReview = new FormData();
    newReview.append("review", reviewsData.review)
    newReview.append("rating", rating);
    
      const config = {
        headers: {
          Authorization : ` Bearer ${token}`
      }
      }
    const response = await axios.post(`http://localhost:4000/reviews/${tourItemId}`, newReview,config)
    SetReviewsData({
      review: ""
    })

    getReview()
    // console.log(response, 44)
  };
  useEffect(() => {
    getReview()
  }, [refresh,edit]);

  //UPDATE reviews & rating:
  const {_id, review} = updateReviews;             //initial value
  // console.log(review)
  const [editReview,setEditReview] =useState(review)
  // console.log(updateReviews.review)

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    
    const newReview = new FormData();
    // console.log(editReview)
    newReview.append("review", editReview)
    newReview.append("rating", rating);
    
      const config = {
        headers: {
          Authorization : ` Bearer ${token}`
      }
      }
    const response = await axios.patch(`http://localhost:4000/reviews/${_id}`, newReview, config )
    console.log(response,12)
    //view that data on UI
    getReview()
    //clear the field after updating the value
    setUpdateReviews({
      review: ""
    })    
  }
  useEffect(() => {
    getReview()
  }, []);


  return (
    <>
      { !updateReviews._id &&
        (<div className='reviews'>
          <form onSubmit={handleSubmit}>
            <label><b>Write a Review:</b></label> <br />
            <textarea cols="50" rows="10"
            name='review'
              value={reviewsData.review}
              onChange={handleChange}
            ></textarea>
          
          <label><b>Rating:</b></label>
            <Rating
              onClick={handleRating}
              ratingValue={rating}
            />{"  "}
            <button>Submit</button>
          </form>
       </div>)
      }

      {/* <SetReviews/> */}

      {/* UPDATE REVIEWS and RATING */}
      { updateReviews._id &&
        (<div className='reviews'>
        <form onSubmit={handleUpdateSubmit}>
          <label><b>Write a Review:</b></label> <br />
          <textarea cols="50" rows="10"
          name='review'
            value={editReview}
            onChange={(e)=>{setEditReview(e.target.value)}}
          ></textarea>
         
         <label><b>Rating:</b></label>
          <Rating
            onClick={handleRating}
            ratingValue={rating}
          />{"  "}
          <button>Update</button>
        </form>
      </div>)
      }
      
    </>
  )
}

export default Reviews