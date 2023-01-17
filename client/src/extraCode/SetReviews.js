import React, { useContext, useEffect, useState } from 'react';
import { DynamicStar } from 'react-dynamic-star'
import axios from 'axios';
import { Data } from '../../../Context/TourContext'

const SetReviews = () => {

  const { toggleupdateReview } = useContext(Data)

  const userToken = JSON.parse(localStorage.getItem("user"));  //setItem() from useSingup.js
  console.log(userToken.Result._id)
  const { token,Result:{_id}} = userToken


  //GET Reviews And Rating
  const [reviewData, setReviewData] = useState([])
  const url = "http://localhost:4000/reviews"
  const getData = async () => {
    const response = await fetch(url)
    const data = await response.json();
    // console.log(data,10)
    setReviewData(data.reviews)
  }
  useEffect(() => {
    getData()
  }, []);


  //DELETE reviews
  const config = {
    headers: {
      Authorization: ` Bearer ${token}`
    }
  }
  const deleteReviews = async (_id) => {
    await axios.delete(`http://localhost:4000/reviews/${_id}`, config)
    getData()
  }
  useEffect(() => {
    getData()
  }, []);





  return (
    <>
      {
        reviewData.map((item, i) => {
          {/* console.log(item,21) */ }
          const {rating, review, name,userId} = item
          console.log(item)
          return (
            <div key={i} className='reviews_rating'>
              <p><b>Reviews: &nbsp;</b>{review}</p>
              <div className="rating">
                <DynamicStar rating={rating} width='30' height='30' />
              </div>
              { 
                _id ===userId ?
                 <div>
                  <button className='view_card_btn1' onClick={() => toggleupdateReview(item)}>Edit</button>
                  <button className='view_card_btn2' onClick={() => deleteReviews(item._id)}>Delete</button>
                </div>  : ""
             }


              <h5><b>Created by:</b>{name}</h5>
            </div>
          )
        })
      }
    </>
  )
}

export default SetReviews